const AudioContext = require('web-audio-api').AudioContext;
const { Deepgram } = require('@deepgram/sdk');
const { get } = require('lodash')
const { MongoClient } = require('mongodb');
const moment = require('moment');
const Lame = require("node-lame").Lame;
const { Storage } = require('@google-cloud/storage');
const config = require('./config')
const deepgram = new Deepgram(config.deepgram.key);
const mongoClient = new MongoClient(config.mongo.url);

const connectToDb = async () => {
  await mongoClient.connect();
  console.log('Connected successfully to server');
  mongoClient.isConnected  = true;
}

const getCollection = async () => {
  if(!mongoClient.isConnected) {
    throw new Error('mongo not connected')
  }
  const db = mongoClient.db();
  return db.collection('descriptions');
}

const http = require("http");

const context = new AudioContext

const storage = new Storage({
  credentials: config.storage.credentials
});
const bucket = storage.bucket(config.storage.bucketName);


const decodeBufferData = async (chunk) => {
  try {
    const decoder = new Lame({
      "output": "buffer",
    }).setBuffer(chunk);

    await decoder.decode();
    const buffer = decoder.getBuffer();
    const encoder = new Lame({
      "output": "buffer",
    }).setBuffer(buffer);
    await encoder.encode()
    return encoder.getBuffer();
  } catch (e) {
    console.log(e);
    console.log(chunk);
    return null;
  }
}

class Saver {
  constructor() {
    this.buffer = [];
    setInterval(() => {
      this.closeStreams()
    }, config.aggregator.bufferTimeInterval)
  }

  async closeStreams() {
    console.log('close');
    try {
      if(!this.buffer.length) return;
      const data = await decodeBufferData(Buffer.concat(this.buffer));
      writeFile(data)
      this.buffer = [];
    } catch (e) {
      console.log(e);
    }
  }

  async pipe(chunk) {
    const decodedBuffer = await decodeBufferData(chunk);
    if(decodedBuffer && decodedBuffer.length/chunk.length > 0.9)  {
      context.decodeAudioData(decodedBuffer, (audioBuffer) => {
        const pcmdata = (audioBuffer.getChannelData(0)) ;
        const samplerate = audioBuffer.sampleRate;
        if(validateSound(pcmdata, samplerate)) this.buffer.push(chunk);
      }, console.log)
    }
  }
}

const takeWords = async (buff) => {
  const response = await deepgram.transcription.preRecorded({
    buffer: buff,
    mimetype: 'mp3',
    // url: `gs://${bucketName}/${filename}`,
  }, {
    punctuate: false,
    // model: 'PhoneCall',
    language: 'ru'
  });
  return (get(response, 'results.channels[0].alternatives[0].words') || []).map(({ word }) => word);
}

const saveToDb = async (data) => {
  const colection = await getCollection();
  return colection.insertOne(data)
}

const saveToBucket = async (buff, filename) => {
  return bucket.file(filename)
    .save(buff)
}

const writeFile = (buff) => {
  const filename = `${Date.now()}.mp3`;
  const url = `https://storage.cloud.google.com/${config.storage.bucketName}/${filename}`;
    saveToBucket(buff, filename)
    .then(async () => {
      console.log(url)
      return takeWords(buff)
    })
    .then((words) => {
      console.log(words);
      return saveToDb(
        {
          url,
          words,
          radioId: config.radioId,
          createdAt: moment().toISOString(),
          from: moment().subtract(config.aggregator.bufferTimeInterval, "milliseconds").toISOString(),
          to: moment().toISOString()
        })
    })
    .catch(console.log);
}


const save = new Saver()

function validateSound(pcmdata) {
  let count = 0;
  let max = 0;
  for(let i = 0; i < pcmdata.length ; i++){
    if(pcmdata[i].toFixed(1) > config.soundFilter.maxPeak) count += 1
    max = pcmdata[i] > max ? pcmdata[i].toFixed(1)  : max ;
  }
  console.log('peaks', Date(), count, pcmdata.length, count/pcmdata.length, max);
  return (count/pcmdata.length) > config.soundFilter.threshold;
}

const main = async () => {
  await connectToDb();
  let data = [];
  setInterval(() => {
    const buff = Buffer.concat(data);
    save.pipe(buff);
    data = []
  }, config.aggregator.chunkTime)
  const req = http.get(config.soundUrl,{
    method: 'GET',
    headers: {
      'Content-Type': 'audio/mpeg',
    }
  }, (res) => {
    res.on('data', (chunk) => {
      data.push(chunk)
    });
    res.on('end', () => {
      console.log('No more data in response.');
    });
    res.on('error', (e) => {
      console.log('error', e);
    });
  });


  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
    main()
  });
}

main()
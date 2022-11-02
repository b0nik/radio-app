module.exports = {
  mongo: {
    url: 'mongodb://localhost:27017',
    dbName: 'zsu-test',
  },
  aggregator: {
    chunkTime: 1000 * 5, // 5s
    bufferTimeInterval: 1000 * 60 * 10, // 10 min
  },
  storage: {
    bucketName: 'zsu-test-bucket-1'
  },
  soundFilter: {
    maxPeak: 0.05,
    threshold: 0.02,
  },
  soundUrl: 'http://192.168.88.249:8000/radio1',
  radioId: 'radio1',
  deepgram: {
    key: 'fd74d5ecaf5c062977dcf130d70f0ac0e8b402b3'
  }
}
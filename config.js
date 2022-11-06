module.exports = {
  mongo: {
    url: process.env.MONGO_URL || 'mongodb://localhost:27017/zsu-test',
  },
  aggregator: {
    chunkTime: 1000 * 5, // 5s
    bufferTimeInterval: 1000 * 60 * 10, // 10 min
  },
  storage: {
    bucketName: 'zsu-test-bucket-1',
    credentials: {
      "type": "service_account",
      "project_id": "zsu-test",
      "private_key_id": "51938e788a6b06465138546f9f174f4042722dc0",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC+TX10FJW81iKU\nW1FQ7b4829GvgkjyN72slI0DlxKm0yUZzmaDZEu/IQ7TzZKd9fqtSleuGIPl8DNv\nE84REKe/LHP9n4b9gL80xSvy43CSTQsXBaSu4WsjZkEkuAniOjsf9vmR/RCsQxHW\nU2kfp1FMDDMamveLQIk0qDXCTS+gqLFGBbdF18a3Y9VxztGWLY36cyKDSip5vmy3\ngA3Env6K3AN8D3mZFlnlX5l98sbhwczfdE2JKm+pYXaCdbmxILn892p8YfUzJ+H3\nzlZ4NvTpmuGNKw9eFlMBR2lMrNYIzREJlORexcuB6xNmHURck8uPNjtDKFJbx9f6\nx/FH1jFjAgMBAAECggEAF/krFLSDKIbRVF8sn0VT8da/U5zWE61x94u/N/SQJPP0\neIvH3kWERU+kzonXLo8ORUZYRVZRR2Y7FIMqMnwmpa6z7f9qwgS2Ea/FGZQNWmDa\nRMwxMtay6IK5Mib9F8K+MAis5/c5YnoQhS98zsAFPc9LoM5k4OYAYuHN4+xVU6e1\nCBT3W9OyFxj4tub0s2hgzOruJehyCKxH6oEbXTvnsSs7zI4hb696Gs1ZbTccUCmb\nd9/ro9O1ePgTULPUcvfDhgxebocePnDbfkkjeHDVZbvWeEcOw7KkQ9sE7FVBqP0U\nD+cf2bRJ8pjh1DUUpAIgRFsHyv7DmwsAeI6TI2EsAQKBgQDkoF58Vg5XmfqsO76Z\n1kn0BesIi8pW0R1tv8tl8/4/mMmqUPluNDuuUmIbBjC1nao2017N8wdJyh2GxbgW\n/zJ6pVItjXI8oOpT5Kra70qVmmWTpT4pwbgt8jFBn3bqQIBu8XhHprCzXI56TQ3B\neVHimjVoC75mYSe+EQAaLFNVewKBgQDVFnWimhxZ8WirshrF0NkNY0y4NFFw5TVR\nnCOa95int+83r71M8zalTU09JeGGIDAIHBpZw80HtinB0llCPHd49emQcL+ycgUv\nV3XI4ZiYKPfnFKc4oEsLjh3SHYPf7gs8e3xfLIsPAI+PwwRSe1uTbDgDplebzIdv\nIt1OnN2rOQKBgGvVVBty/3rEDp6z4zduAh2NuQij3oDKSwYbw1TIG3BloSCq5qrb\nChczlkBG0CypO8J2Oa4L5bEhGoIZubVnEqkUVslTgMEl6MA/B3MSEGy1kRltg/9v\n9m39YMwh6ZWdbLZnQCMTdR50FmOK+mT50ux9bZkwiNKDGpqkLBcsNvYHAoGBAJET\nIHXa7JCD3lp/AOFLBmup/pKu8/+j3cA5SLh599HAVbqZCI26TKsQTRTjlH6nrWvo\nDjytJQsqB5XxK1oAJusQqbrwOGM6Y7NOnV9t0GFQCy+ljQ/tegpc8IqcE6vCup2s\nCQoXHnnRTOx4vpmVaMye8ifx+VWWU2Lj3r5l6DlpAoGAUtTs7qayTRcYbEMyPxWC\nOoITf9Yi9hkwO1huIpbsNyhEEqoVIl/q7UzpZKRkuyZMV2JDL20vBmeO/ah1VPeI\njW3AlPjg9R1LPcJkw6EeyIgxKwvG7WasU4hn5lo5hRW4yzLUj5jcnWmol3spq5s3\ne5sWYsuqebtkxChdUkAW8a0=\n-----END PRIVATE KEY-----\n",
      "client_email": "zsu-test@zsu-test.iam.gserviceaccount.com",
      "client_id": "103510827073054056210",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/zsu-test%40zsu-test.iam.gserviceaccount.com"
    }
  },
  soundFilter: {
    maxPeak: 0.05,
    threshold: 0.02,
  },
  soundUrl: process.env.SOUND_URL || 'http://192.168.88.249:8000/radio1',
  radioId: process.env.RADIO_ID || 'radio2',
  deepgram: {
    key: process.env.DEEPGRAM_KEY || 'fd74d5ecaf5c062977dcf130d70f0ac0e8b402b3'
  }
}
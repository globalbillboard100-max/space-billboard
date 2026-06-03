import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import https from 'https'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ADS_DIR = path.join(__dirname, '../public/ads')

// Create directory if it doesn't exist
if (!fs.existsSync(ADS_DIR)) {
  fs.mkdirSync(ADS_DIR, { recursive: true })
}

const NUM_IMAGES = 16
const WIDTH = 600
const HEIGHT = 900

console.log(`Downloading ${NUM_IMAGES} placeholder images to ${ADS_DIR}...`)

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        // Follow redirect (Picsum redirects to actual image URL)
        https.get(res.headers.location, (redirectRes) => {
          const stream = fs.createWriteStream(filepath)
          redirectRes.pipe(stream)
          stream.on('finish', () => {
            stream.close()
            resolve()
          })
        }).on('error', reject)
      } else {
        const stream = fs.createWriteStream(filepath)
        res.pipe(stream)
        stream.on('finish', () => {
          stream.close()
          resolve()
        })
      }
    }).on('error', reject)
  })
}

async function run() {
  for (let i = 0; i < NUM_IMAGES; i++) {
    // Generate a random seed so we get distinct images
    const seed = Math.floor(Math.random() * 100000)
    const url = `https://picsum.photos/seed/${seed}/${WIDTH}/${HEIGHT}`
    const filepath = path.join(ADS_DIR, `ad_${i}.jpg`)
    
    try {
      console.log(`Downloading image ${i + 1}/${NUM_IMAGES}...`)
      await downloadImage(url, filepath)
    } catch (e) {
      console.error(`Failed to download image ${i}:`, e)
    }
  }
  console.log('All images downloaded successfully!')
}

run()

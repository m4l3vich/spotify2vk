var connect = require('spotify-local-control')
var https = require('https')
var querystring = require('querystring')
var client = connect()
var argv = require('minimist')(process.argv.slice(2)) || {}
var prevText = ''
var isExiting = false
var isPaused = false
console.log(`Starting Spotify2VK v${require('./package.json').version} by M4L3VICH`)

var config = {
  token: argv.token,
  statusPrefix: argv.prefix || 'Spotify |',
  statusReplace: argv.replacer,
  current: argv.current
}

if (argv.help || argv.h) {
  console.log([
    `Spotify2VK: show Spotify currently playing track in VK status`,
    `Usage:`,
    `--token <token>        VK access_token (required)`,
    `--prefix <prefix>      Status prefix (default: "Spotify |")`,
    `--replacer <replacer>  Text that will be set in status before closing the app`,
    `--current              Use current (before running app) status as replacer`
  ].join('\n'))
  process.exit()
} else if (!config.token) {
  console.error('Please provide a valid VK access_token by adding "--token <access_token>"')
  process.exit()
}

async function loop () {
  // console.log('previous',prevText)
  var status = await client.status()
  var track = status.body.track
  var text = `${track.artist_resource.name} - ${track.track_resource.name}`

  if (prevText !== text && status.body.playing) {
    prevText = text
    isPaused = false
    https.get(`https://api.vk.com/method/status.set?text=${querystring.escape(config.statusPrefix.trim() + ' ' + text)}&access_token=${config.token}`, function (res) {
      res.on('data', (d) => {
        var r = JSON.parse(d.toString())
        if (r.error) {
          console.error('VK error:', r.error.error_msg)
          process.exit()
        }
      })
    })
    console.log('New track:', text)
  } else if (!status.body.playing && !isPaused) {
    console.log('Paused, setting replacer status')
    https.get(`https://api.vk.com/method/status.set?text=${querystring.escape(config.statusReplace)}&access_token=${config.token}`, function (res) {
      res.on('data', (d) => {
        console.log('Done')
        isPaused = true
        prevText = ''
      })
    })
  }
  setTimeout(loop, 500)
}

if (config.current) {
  console.log('Getting current user status...')
  https.get(`https://api.vk.com/method/status.get?access_token=${config.token}`, function (res) {
    res.on('data', (d) => {
      var r = JSON.parse(d.toString())
      if (r.error) {
        console.error('VK error:', r.error.error_msg)
        process.exit()
      } else {
        console.log(`Got it! Replacer: ${r.response.text}`)
        config.statusReplace = r.response.text
        loop()
      }
    })
  })
} else {
  loop()
}

function beforeExit () {
  if (config.statusReplace && !isExiting) {
    isExiting = true
    console.log('Setting replacer as status...')
    https.get(`https://api.vk.com/method/status.set?text=${querystring.escape(config.statusReplace)}&access_token=${config.token}`, function (res) {
      res.on('data', (d) => {
        console.log('Done! Exiting...')
        process.exit()
      })
    })
  } else {
    process.exit()
  }
}

process.on('exit', beforeExit)
process.on('SIGINT', beforeExit)
process.on('SIGUSR1', beforeExit)
process.on('SIGUSR2', beforeExit)
process.on('uncaughtException', beforeExit)

class EventEmitter {
  constructor () {
    this.event = {}
  }

  on (eventName, callback) {
    const callbacks = this.event[eventName] || []
    callbacks.push(callback)
    this.event[eventName] = callbacks
  }

  emit (eventName, ...args) {
    this.event[eventName].forEach(element => {
      element(...args)
    })
  }

  off (eventName, callback) {
    this.event[eventName] = this.event[eventName].filter(item => {
      return item !== callback && item.origin !== callback
    })
  }

  once (eventName, callback) {
    const callbacks = this.event[eventName] || []
    const oneTime = (...args) => {
      callback(...args)
      this.off(eventName, oneTime)
    }

    oneTime.origin = callback
    callbacks.push(oneTime)
  }
}



const emitter = new EventEmitter ()

const user1 = (...args) => {
  console.log('user1:', args)
}

const user2 = (...args) => {
  console.log('user2:', args)
}

const user3 = (...args) => {
  console.log('user3:', args)
}


emitter.on('hello', user1)

emitter.on('hello', user2)

emitter.emit('hello', 'this is a message')

emitter.off('hello', user1)

emitter.once('hello', user3)
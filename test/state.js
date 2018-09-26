const State = require('../lib/state')
require('should')

describe('state', function () {
  it('name', () => {
    let state = new State('foo')
    state.name().should.be.exactly('foo')
    state.name('bar').name().should.be.exactly('bar')
  })

  it('label', () => {
    let state = new State('foo')
      .label('bar')

    state.label().should.be.exactly('bar')
  })

  it('routes', () => {
    let state = new State('good')
      .routes({
        beat: 'bad'
      })

    state.routes().beat.should.be.exactly('bad')
  })

  it('transit', () => {
    return new State('good')
      .routes({
        beat: 'bad'
      })
      .transit('beat')
      .then(state => state.should.be.exactly('bad'))
  })

  it('throw invalid op', () => {
    new State('good')
      .routes({
        beat: 'bad'
      })
      .transit('hit')
      .should.be.rejectedWith(Error, { op: 'hit' })
  })

  it('ops', async () => {
    new State('good')
      .routes({
        beat: {
          to: 'bad',
          test () {
            throw new Error('foo')
          }
        }
      })
      .ops
      .should.be.resolvedWith([])
  })
})

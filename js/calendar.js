var timeArray = [
  { begin: 0930, finish: 1130, text: 'Meeting', details: 'First Meeting' },
  { begin: 1700, finish: 1900, text: 'Meeting', details: 'Second Meeting' },
  { begin: 0200, finish: 0300, text: 'Meeting', details: 'Third Meeting' },
  { begin: 150, finish: 175, text: 'Meeting', details: 'Fourth Meeting' },
  { begin: 200, finish: 250, text: 'Meeting', details: 'Fifth Meeting' }
]

var calendarFunction = function (times) {
  var sortedTimes = times.sort(function (x, y) {
    return x.begin - y.begin || y.finish - x.finish
  }),
  addSpace = 2.5

  sortedTimes.forEach(function (event, i, overlap) {
    var eventTimeBlock = addSpace * (event.finish - event.begin)
    var eventTop = addSpace * event.begin
    var previousTimeBlock = overlap[i - 1]
    var upcomingTimeBlock = overlap[i + 1]
    var newEventBlockDiv = document.createElement('div')
    var timeDiv = document.createElement('div')

    event.direction = 'left'

    if (upcomingTimeBlock && event.finish > upcomingTimeBlock.begin) {
      event.overlap = true
      upcomingTimeBlock.overlap = true
    }

    if (previousTimeBlock && previousTimeBlock.direction === 'left') {
      event.direction = 'right'
    }

    event.overlap && newEventBlockDiv.setAttribute('class', 'split ' + event.direction || '')
    newEventBlockDiv.setAttribute('style', 'height:' + eventTimeBlock + 'px; top:' + eventTop + 'px')
    // calendar.innerText = event.begin + ' - ' + event.finish
    newEventBlockDiv.innerText = event.text + '\n' + event.details

    document.getElementById('calendar').appendChild(newEventBlockDiv)
  })

}

calendarFunction(timeArray)

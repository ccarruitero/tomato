var Timer = {
  init: function(el) {
    // set elements
    this.timer = el;
    this.picker = document.querySelector('#time-picker');
    this.pomodoro = document.querySelector('#pomodoro');
    // hide timePicker
    this.picker.classList.add('hide');
    this.setDefault();
    this.setEvents(el);
  },

  setDefault: function() {
    // 25' by default
    var min = 25;
    var sec = 0;

    this.setDuration(min, sec);
    this.renderTimer(min, sec);
    this.paused = false;
  },

  parseTime: function(time) {
    // get minutes and seconds from time in milliseconds
    var min = Math.floor(time / 60000);
    var sec = (time % 60000)/1000;
    return [min, sec];
  },
  
  setDuration: function(min, sec) {
    // get time in milliseconds
    var mins = min * 60 * 1000;
    var secs = sec * 1000;
    this.duration = mins + secs;
  },

  renderTimer: function(min, sec) {
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    this.timer.textContent = min + ":" + sec;
  },

  setEvents: function(el) {
    var self = this;
    el.addEventListener("click", function(e) {
      self.togglePanels();
    });

    this.timerEvents();
    this.pickerEvents();
  },

  togglePanels: function() {
    this.picker.classList.toggle('hide');
    this.pomodoro.classList.toggle('hide');
  },

  timerEvents: function() {
    var startBtn = document.querySelector('#start');
    var pauseBtn = document.querySelector('#pause');
    var resetBtn = document.querySelector('#reset');
    var self = this;

    startBtn.addEventListener('click', function(e) {
      self.startCountdown();
    });

    pauseBtn.addEventListener('click', function(e) {
      clearInterval(self.counter);
      self.pauseCountdown();
    });

    resetBtn.addEventListener('click', function(e) {
      clearInterval(self.counter);
      self.setDefault();
    });
  },

  pickerEvents: function() {
    var saveBtn = document.querySelector('#save');
    var cancelBtn = document.querySelector('#cancel');
    var self = this;

    saveBtn.addEventListener('click', function(e) {
      var minutes = document.querySelector("input[name='minutes']").value;
      var seconds = document.querySelector("input[name='seconds']").value;
      minutes = minutes === "" ? 0 : minutes;
      seconds = seconds === "" ? 0 : seconds;
      self.setDuration(minutes, seconds);
      self.renderTimer(minutes, seconds);
      self.togglePanels();
    });

    cancelBtn.addEventListener('click', function(e) {
      self.togglePanels();
    });
  },

  startCountdown: function() {
    this.remaining = this.duration;
    this.estimatedEnd = Date.now() + this.duration;
    var self = this;
    this.counter = setInterval(function() {
      var diff = self.estimatedEnd - Date.now();
      if (diff >= 0) {
        self.remaining -= 1000;
        time = self.parseTime(self.remaining);
        var min = time[0];
        var sec = time[1];
        self.renderTimer(min, sec);
        if (diff === 0) { clearInterval(self.counter) }
      }
    }, 1000);
  },

  pauseCountdown: function() {
    var self = this;
    if (this.paused) {
      self.paused = false;
      self.duration = self.remaining;
      self.startCountdown();
    } else {
      self.paused = true;
      clearInterval(self.counter);
    }
  }
}

var timer = document.querySelector('#timer');
Timer.init(timer);

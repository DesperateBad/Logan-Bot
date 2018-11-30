$( document ).ready(function() {
  // $.noConflict();
  
    $('.dropdown-trigger').dropdown({coverTrigger: false});
    $('.collapsible').collapsible();
    $('.tooltipped').tooltip({margin: 1});
    
  
    function updateConf(url, data, callback) {
      if (typeof data === 'function') {
				callback = data;
				data = {};
			}
      
      if (typeof data !== 'object') {
        return console.log('Data given was not an object!');
      }

			var options = {
				method: 'POST',
				url: url,
			};

			data = data || {};

			if (data) {
				options.data = data;
			}

			$.ajax(options).done(function (msg) {
				return callback(null, msg);
			}).fail(function () {
				return callback(true);
			});
    };
    
    
    $('.checkAndSelect input[type="checkbox"]').each(function(i) {
      let selectBar = this.getAttribute("data-selectid");
      if (this.checked) {
        $('.checkAndSelect').find('#' + selectBar).prop('disabled', false);
      } else {
        $('.checkAndSelect').find('#' + selectBar).prop('disabled', true);
      }
    });
  
    function showError() {
      if (arguments) {
        M.toast({html: arguments[0], classes: 'rounded red'});
      } else {
        M.toast({html: 'An error occured', classes: 'rounded red'});
      }
    };
    
    function showSuccess(message) {
      M.toast({html: message, classes: 'rounded green'});
    };
  
    $('.checkAndSelect').find("input[type='checkbox']").on('change', function() {
      let selectBar = this.getAttribute("data-selectid");
      if (this.checked) {
        $('.checkAndSelect').find('#' + selectBar).prop('disabled', false);
      } else {
        $('.checkAndSelect').find('#' + selectBar).prop('disabled', true);
      }
    });
      
    $('.eventCheckbox').on('click', function() {
      var enabled = $(this).is(':checked') ? "true" : "false",
          event = $(this).attr('id'),
          eventEzName = this.name,
          url = "/api/" + server + "/updateConf",
          data = { key: event, value: enabled };
      if (protection !== 'continue') return showError("Please wait before changing that again");
      updateConf(url, data, function (err, msg) {
        if (err) return showError();
        var enabledOrDisabled = enabled ? 'enabled' : 'disabled';
        return showSuccess(`${eventEzName} has been ${enabledOrDisabled}`);
      })
    });
  
    $('.enableCommand').on('click', function() {
      let command = this.getAtrribute('data-command'),
          url = "/api/" + server + "/enableCommand",
          data = { command: command };
      updateConf(url, data, function (err, msg) {
        if (err) return showError();
        $(this).find("i").switchClass('remove', 'plus');
				return showSuccess(`Command ${command} has been enabled`);
      })
    });
  
    $('.disableCommand').on('click', function() {
      let command = this.getAtrribute('data-command'),
          url = "/api/" + server + "/disableCommand",
          data = { command: command };
      updateConf(url, data, function (err, msg) {
        if (err) return showError();
        $(this).find("i").switchClass('plus', 'remove');
				return showSuccess(`Command ${command} has been enabled`);
      })
    });
  
  $('.changeNick').on('keyup', function(e) {
    e.preventDefault();
    if ((e.code || e.which) == 13) {
    let nick = $(this).val(),
        url = "/api/" + server + "/changeNickname",
        data = { nickname: nick };
    updateConf(url, data, function (err, msg) {
      if (err) return showError();
      var newNick = nick;
      return showSuccess(`Nickname changed to ${newNick}`);
    })
    } else return;
  });
  
  $('.changePrefix').on('keyup', function(e) {
    e.preventDefault();
    if ((e.code || e.which) == 13) {
    let prefix = $(this).val(),
        url = "/api/" + server + "/changePrefix",
        data = { prefix: prefix };
    updateConf(url, data, function (err, msg) {
      if (err) return showError();
      var newNick = prefix;
      return showSuccess(`Prefix changed to ${prefix}`);
    })
    } else return;
  });
  
});
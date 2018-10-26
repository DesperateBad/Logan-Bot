$( document ).ready(function() {
  $.noConflict();
  
    $('.dropdown-trigger').dropdown({coverTrigger: false});
    $('.collapsible').collapsible();
    $('.tabs').tabs();
    $('.tooltipped').tooltip({swipeable: true});
    $('.modal').modal();
  
    function updateConf(url, data, callback) {
      if (typeof data === 'function') {
				callback = data;
				data = {};
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
    
    function showError() {
      M.toast({html: 'An error occured', classes: 'rounded red'});
    };
    
    function showSuccess(message) {
      M.toast({html: message, classes: 'rounded green'});
    };
  
    $('.checkAndSelect').find("input[type='checkbox']").on('change', function() {
      var selectBar = this.getAttribute("data-selectid");
      if (this.checked) {
        $('.checkAndSelect').find('#' + selectBar).prop('disabled', false);
      } else {
        $('.checkAndSelect').find('#' + selectBar).prop('disabled', true);
      }
    });
  
    $('.twoChecksAndSelect').find("input[type='checkbox']").first().on('change', function() {
      var selectBar = this.getAttribute("data-selectid");
      var secondCheck = $
  
    $('.eventCheckbox').on('change', function() {
      var enabled = this.checked ? "true" : "false",
          event = this.val(),
          eventEzName = this.name,
          url = "/dashboard/" + server + "/manage/updateEvent/",
          data = { event: event, enabled: enabled };
      updateConf(url, data, function (err, msg) {
        if (err) return showError();
        var enabledOrDisabled = enabled ? 'enabled' : 'disabled';
        return showSuccess(`${eventEzName} has been ${enabledOrDisabled}`);
      })
    });
  
    $('.cmdCheckBox').on('change', function() {
      var command = $(this).val(),
          enabled = this.checked,
          url = "/dashboard/" + server + "/manage/updateCmd",
          data = { command: command, enabled: enabled };
      updateConf(url, data, function (err, msg) {
        if (err) return showError();
        var enabledOrDisabled = enabled ? 'enabled' : 'disabled'
				return showSuccess(`Command ${command} has been ${enabledOrDisabled}`);
      })
      
    });
  
  $('#changeNickname').on('input', function(e) {
    e.preventDefault();
    var nick = $(this).val(),
        url = "/dashboard/" + server + "/manage/changeNickname",
        data = { nickname: nick };
    updateConf(url, data, function (err, msg) {
      if (err) return showError();
      var newNick = nick;
      return showSuccess(`Nickname changed to ${newNick}`);
    })
  });
  
  $('#changePrefix').on('input', function(e) {
    e.preventDefault();
    var prefix = $(this).val(),
        url = "/dashboard/" + server + "/manage/changePrefix",
        data = { prefix: prefix };
    updateConf(url, data, function (err, msg) {
      if (err) return showError();
      var newNick = prefix;
      return showSuccess(`Prefix changed to ${prefix}`);
    })
  });
  
});
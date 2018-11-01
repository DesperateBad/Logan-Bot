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
      let selectBar = this.getAttribute("data-selectid");
      if (this.checked) {
        $('.checkAndSelect').find('#' + selectBar).prop('disabled', false);
      } else {
        $('.checkAndSelect').find('#' + selectBar).prop('disabled', true);
      }
    });
  
    $('.twoChecksAndSelect').find('input[data-nthof="first"], input[data-nthof="second"]').on('change', function() {
      var secondCheckId = $(this).attr('data-othercheck'),
          secondCheck = document.getElementById(secondCheckId),
          selectBar = $(this).attr('data-selectid');
      if (this.checked || secondCheck.checked) {
        $('.twoChecksAndSelect').find('#' + selectBar).prop('disabled', false);
      } else {
        $('.twoChecksAndSelect').find('#' + selectBar).prop('disabled', true);
      }
    });
      
  
    $('.eventCheckbox').on('click change', function() {
      let enabled = this.checked ? "true" : "false",
          event = this.val(),
          eventEzName = this.name,
          url = "/dashboard/" + server + "/manage/updateConf",
          data = { event: event, enabled: enabled };
      updateConf(url, data, function (err, msg) {
        if (err) return showError();
        var enabledOrDisabled = enabled ? 'enabled' : 'disabled';
        return showSuccess(`${eventEzName} has been ${enabledOrDisabled}`);
      })
    });
  
    $('.cmdCheckBox').on('click change', function() {
      let command = $(this).val(),
          enabled = this.checked,
          url = "/dashboard/" + server + "/manage/updateCmd",
          data = { command: command, enabled: enabled };
      updateConf(url, data, function (err, msg) {
        if (err) return showError();
        var enabledOrDisabled = enabled ? 'enabled' : 'disabled'
				return showSuccess(`Command ${command} has been ${enabledOrDisabled}`);
      })
      
    });
  
  $('.changeNick').on('keyup', function(e) {
    e.preventDefault();
    if ((e.code || e.which) == 13) {
    let nick = $(this).val(),
        url = "/dashboard/" + server + "/manage/changeNickname",
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
        url = "/dashboard/" + server + "/manage/changePrefix",
        data = { prefix: prefix };
    updateConf(url, data, function (err, msg) {
      if (err) return showError();
      var newNick = prefix;
      return showSuccess(`Prefix changed to ${prefix}`);
    })
    } else return;
  });
  
});
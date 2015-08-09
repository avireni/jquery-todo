$(document).ready(function () {
	$('.tabController').css('display', 'none');

	$('#inputText').keypress(function (e) {
		if (e.which == 13) {
			var item = $('#inputText').val();
			if (item == '') {
				alert("No task added");
			} else {
				$('#inputText').val("");
				addItem(item);
			}
		}
	});

//	Show Completed tasks on Completed panel
	$("a[href='#completed']").on('shown.bs.tab', function (e) {
		$('#completedPanel').html("");
		$.each($("input[name='itemGroup']:checked"), function () {
			$('#completedPanel').append('<div>' + $(this).siblings('label').text() + '</div>');
		});
	});

//	Show Pending tasks on Pending panel
	$("a[href='#pending']").on('show.bs.tab', function (e) {
		$('#pendingPanel').html("");
		$.each($("input[name='itemGroup']:not(:checked)"), function () {
			$('#pendingPanel').append('<div>' + $(this).siblings('label').text() + '</div>');
		});
	});

//Change color if checked/unchecked
	$('#home').on('change', 'input[name="itemGroup"]', function () {
		$.each($("input[name='itemGroup']:checked"), function () {
			$(this).parent().css('color', '#F54D4D');
		});
		$.each($("input[name='itemGroup']:not(:checked)"), function () {
			$(this).parent().css('color', '#4E4E4E');
		});
	});

//Select/Deselect All
	$('#home').on('change', '#selectDeselect', function () {
		if ($('#selectDeselect').is(':checked')) {
			$.each($("input[name='itemGroup']"), function () {
				$(this).prop('checked', true);
				$(this).parent().css('color', '#F54D4D');
			});
		} else if (!($('#selectDeselect').is(':checked'))) {
			$.each($("input[name='itemGroup']"), function () {
				$(this).prop('checked', false);
				$(this).parent().css('color', '#4E4E4E');
			});
		}
	});

	//Show Edit box when doubleclicked
	$('#home').on('dblclick', '.items label', function () {
		var isChecked = $(this).siblings("input[name='itemGroup']").is(':checked');
		console.log(isChecked);
		if (!isChecked) {
			$(this).parent().append("<input type='text' id='edit' value='" +
				$(this).text() +
				"'>");
			$(this).hide();
		} else {
			alert("completed item cant be edited");
		};
	});

//update edited values
	$('#home').on('blur mouseout', '#edit', function () {
		$(this).siblings('label').text($(this).val()).show();
		$(this).hide();
	});

//Show delete button on hover
	$('#home').on('mouseenter mouseleave', '.itemList', function () {
	$(this).children('.showRemove').toggleClass('active');
	});

//delete when clicked on remove button
	$('#home').on('click', '.showRemove', function () {
		$(this).parent().remove();
	});

//delete all completed tasks
	$('#btnSubmit').on('click', function () {
		$.each($("input[name='itemGroup']:checked"), function () {
			$(this).parents('li').remove();
		});
	});
	
//add new items
	var addItem = function (i) {
		$('.tabController').css('display', 'block');
		var newItem = "<li class='itemList'><div class='items'><input type='checkbox' name='itemGroup' class='showInline' value='" + i + "'><label>" + i + "</label></div><div class='showRemove'><span class='glyphicon glyphicon-remove'></span><div></li>";
		$('.taskList').append(newItem);
	};

});

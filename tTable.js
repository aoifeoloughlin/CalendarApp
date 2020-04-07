$(document).ready(
   function(){
	     var tTableData;
        //GET request for user timetable
	      (tTableData = []).length = 84; 
	      tTableData.fill(0);

	modableTTable(tTableData);

	/* arrayAddition example
	var tTableData2;
	(tTableData = []).length = 84; tTableData.fill(0);
	(tTableData2 = []).length = 84; tTableData2.fill(0);
	
	tTableData[17] = 1;
	tTableData2[12] = 1;
	tTableData = arrayAddition(calData, calData2)
	fillCal(tTableData)
	*/

	}
);

function arrayAddition(array1,array2)
{
	var out = [];
	if(array1.length == array2.length)
	{
		for(i = 0; i < array1.length; i++)
		{
			out[i] = (array1[i] || array2[i]);
		}
	}
	return out;
}

//uneditable time table
function fillCal(tTableData)
{
	var k = 0;
	
	var table = "<table class='text-center table table-bordered' style='width 100%'><thead><tr><th>Time</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th>";
	table += "<th>Fri</th><th>Sat</th><th>Sun</th></tr></thead><tbody>";
	for (var i=0; i<12;i++)
	{
		table += "<tr><td>"+(i+9)+":00</td>";
		for (var j=0; j<7; j++)
		{
			if(tTableData[k] == 0)
			{
				table += "<td class=''></td>";
				
			}
			else{
				table += "<td class='table-danger'></td>";
				
			}
			k++;
		}
		table += "</tr>";
	}	
	table += "</tbody></table>";
	$("#tTable").html(table);
}



function modableTTable(tTableData)
{
	
	var k = 0;
	tTableData[17] = 1;


	var table = "<table class='text-center table table-bordered table-hover table-fixed' style='width:100%'><thead><tr><th>Time</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th>";
	table += "<th>Fri</th><th>Sat</th><th>Sun</th></tr></thead><tbody>";

	for (var i=0; i<12;i++)
	{
		table += "<tr><td>"+(i+9)+":00</td>";
		for (var j=0; j<7; j++)
		{
			if(tTableData[k] == 0)
			{
				table += "<td class='' value='"+k+","+0+"'></td>";
				
			}
			else{
				table += "<td class='table-danger' value='"+k+","+1+"'></td>";
				
			}
			k++;
		}
		table += "</tr>";
	}	
	table += "</tbody></table><br><button type='text' id='saveTTable' class='btn btnprimary'>Save</button>";
	$("#tTable").html(table);
  
	$("td").click(function(event){
		if($(this).attr("value"))
		{
			var cell = $(this).attr("value").split(",");
			var newCell = "";
			if(cell[1] == 1)
			{
				tTableData[cell[0]] = 0;
				newCell = ""+cell[0]+",0";

				$(this).attr("value", newCell);

			}
			else if(cell[1] == 0)
			{
				tTableData[cell[0]] = 1;
				newCell = ""+cell[0]+",1";

				$(this).attr("value", newCell);

			}

			$(this).toggleClass('table-danger')
		}

	});
	$("#saveTTable").click(function (event) {
			console.log(tTableData);
			/*
			$.ajax({
				url: '/updateTTable/',
				type: 'UPDATE',
				data: {user_name:"EndaB",
				comment:$('#inputPost').val(),
				date_created:now},
				success: function (data) {
					//getComments();
					getTenComments();
				}
			});
			*/
		});

}

/*
incomplete mongoose 
function updateTTableData(timeTableData)
{
	$.ajax({
		url: '',
		type: 'UPDATE',
		data:{
			timeTableData: timeTableData
		},
		success: 
	});
}
*/

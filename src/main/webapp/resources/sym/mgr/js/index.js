'use strict'
$('#students').click( e => {
	$.getJSON(`/students`, d => {
		let tr = ``
		if(d.length != 0){
			let i = 0
			for(; i< d.length; i++){
				tr +=`<tr>`
					+`<td>${d[i].stuNum}</td>`
					+`<td>${d[i].userid}</td>`
					+`<td><a href="#" class="names" id="${d[i].userid}">${d[i].name}</a></td>`
					+`<td>${d[i].ssn}</td>`
					+`<td>${d[i].regDate}</td>`
					+`<td>${d[i].subject}</td>`
					+`</tr>`
			}
		}else{
			tr = `<td colspan="6"> 조회내용이 없습니다 </td>`
		}
		$(`main`).html(`<h2>학습자 목록</h2>
					<table>
					<thead>
					<tr>
						<th>학번</th>
						<th>아이디</th>
						<th>이름</th>
						<th>생년월일</th>
						<th>등록일</th>
						<th>수강과목</th>
					</tr>
					</thead>
					<tbody>
					${tr}
					</tbody>
					</table>
			`)
		$('.names').each(function(i){
			$(this).click(e => {
				localStorage.setItem("searchId", `${this.id}`)
				location.href = '/transfer/sym/mgr/student'
			})
		})
	})
})
$(`#teachers`).click(e => {
	$.getJSON(`/teachers`, d=>{
		let tr = ``
		if(d.length != 0){
			let i = 0
			for(;i<d.length;i++){
				tr +=`<tr>`
					+`<td>${d[i].teaNum}</td>`
					+`<td><a href="#" class="names" id="${d[i].teaNum}">${d[i].name}</a></td>`
					+`<td>${d[i].email}</td>`
					+`<td>${d[i].subject}</td>`
					+`</tr>`
			}
		}else{
			tr = `<td colspan="4"> 조회내용이 없습니다 </td>`
		}
		// teaNum, name, email, password, subject, profileImage
		$(`main`).html(`<h2>교강사 목록</h2>
					<table>
					<thead>
					<tr>
						<th>교강사번호</th>
						<th>이름</th>
						<th>이메일</th>
						<th>담당과목</th>
					</tr>
					</thead>
					<tbody>
					${tr}
					</tbody>
					</table>
			`)
		$(`.names`).each(function(i){
			$(this).click(e => {
				localStorage.setItem(`searchTeacher`, `${this.id}`)
				location.href = `/transfer/sym/tea/teacher`
			})
		})
		// 세션 스토리지 : 로그인 정보를 담는다 (보안)
		// 로컬 안토리지 : 그 외 정보를 담는다 (보안X)
	})
})

$(function() {
	var ctx = document.getElementById('chartjs-dashboard-line').getContext("2d");
	var gradient = ctx.createLinearGradient(0, 0, 0, 225);
	gradient.addColorStop(0, 'rgba(215, 227, 244, 1)');
	gradient.addColorStop(1, 'rgba(215, 227, 244, 0)');
	// Line chart
	new Chart(document.getElementById("chartjs-dashboard-line"), {
		type: 'line',
		data: {
			labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			datasets: [{
				label: "Sales ($)",
				fill: true,
				backgroundColor: gradient,
				borderColor: window.theme.primary,
				data: [
					2115,
					1562,
					1584,
					1892,
					1587,
					1923,
					2566,
					2448,
					2805,
					3438,
					2917,
					3327
				]
			}]
		},
		options: {
			maintainAspectRatio: false,
			legend: {
				display: false
			},
			tooltips: {
				intersect: false
			},
			hover: {
				intersect: true
			},
			plugins: {
				filler: {
					propagate: false
				}
			},
			scales: {
				xAxes: [{
					reverse: true,
					gridLines: {
						color: "rgba(0,0,0,0.0)"
					}
				}],
				yAxes: [{
					ticks: {
						stepSize: 1000
					},
					display: true,
					borderDash: [3, 3],
					gridLines: {
						color: "rgba(0,0,0,0.0)"
					}
				}]
			}
		}
	});
});

$(function() {
	// Pie chart
	new Chart(document.getElementById("chartjs-dashboard-pie"), {
		type: 'pie',
		data: {
			labels: ["Chrome", "Firefox", "IE"],
			datasets: [{
				data: [4306, 3801, 1689],
				backgroundColor: [
					window.theme.primary,
					window.theme.warning,
					window.theme.danger
				],
				borderWidth: 5
			}]
		},
		options: {
			responsive: !window.MSInputMethodContext,
			maintainAspectRatio: false,
			legend: {
				display: false
			},
			cutoutPercentage: 75
		}
	});
});

$(function() {
	new Chart(document.getElementById("chartjs-dashboard-bar"), {
		type: 'bar',
		data: {
			labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			datasets: [{
				label: "This year",
				backgroundColor: window.theme.primary,
				borderColor: window.theme.primary,
				hoverBackgroundColor: window.theme.primary,
				hoverBorderColor: window.theme.primary,
				data: [54, 67, 41, 55, 62, 45, 55, 73, 60, 76, 48, 79],
				barPercentage: .75,
				categoryPercentage: .5
			}]
		},
		options: {
			maintainAspectRatio: false,
			legend: {
				display: false
			},
			scales: {
				yAxes: [{
					gridLines: {
						display: false
					},
					stacked: false,
					ticks: {
						stepSize: 20
					}
				}],
				xAxes: [{
					stacked: false,
					gridLines: {
						color: "transparent"
					}
				}]
			}
		}
	});
});

$(function() {
	$("#world_map").vectorMap({
		map: "world_mill",
		normalizeFunction: "polynomial",
		hoverOpacity: .7,
		hoverColor: false,
		regionStyle: {
			initial: {
				fill: "#e3eaef"
			}
		},
		markerStyle: {
			initial: {
				"r": 9,
				"fill": window.theme.primary,
				"fill-opacity": .95,
				"stroke": "#fff",
				"stroke-width": 7,
				"stroke-opacity": .4
			},
			hover: {
				"stroke": "#fff",
				"fill-opacity": 1,
				"stroke-width": 1.5
			}
		},
		backgroundColor: "transparent",
		zoomOnScroll: false,
		markers: [{
				latLng: [31.230391, 121.473701],
				name: "Shanghai"
			},
			{
				latLng: [28.704060, 77.102493],
				name: "Delhi"
			},
			{
				latLng: [6.524379, 3.379206],
				name: "Lagos"
			},
			{
				latLng: [35.689487, 139.691711],
				name: "Tokyo"
			},
			{
				latLng: [23.129110, 113.264381],
				name: "Guangzhou"
			},
			{
				latLng: [40.7127837, -74.0059413],
				name: "New York"
			},
			{
				latLng: [34.052235, -118.243683],
				name: "Los Angeles"
			},
			{
				latLng: [41.878113, -87.629799],
				name: "Chicago"
			},
			{
				latLng: [51.507351, -0.127758],
				name: "London"
			},
			{
				latLng: [40.416775, -3.703790],
				name: "Madrid"
			}
		]
	});
	setTimeout(function() {
		$(window).trigger('resize');
	}, 250)
});

$(function() {
	$('#datetimepicker-dashboard').datetimepicker({
		inline: true,
		sideBySide: false,
		format: 'L'
	});
});
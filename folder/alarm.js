const current_time=document.getElementById("current-time")
      const taskList = document.getElementById('list');
      let alarms = [];

      // CURRENT-TIME
      const fetchTime = () => {
          // var currentTime = document.getElementById("current-time");
          const currentDate = new Date();
          var hours = currentDate.getHours();
          var minutes = currentDate.getMinutes();
          var seconds = currentDate.getSeconds();
          var ampm = hours >= 12 ? "PM" : "AM";
          if (hours > 12) {
            hours = hours % 12;
          }
          const timeString = convertTimeString({ hours, minutes, seconds, ampm });
          current_time.innerHTML = timeString;
        };

        const convertTimeString = ({ hours, minutes, seconds, ampm }) => {
          if (minutes / 10 < 1) {
            minutes = "0" + minutes;
          }
          if (seconds / 10 < 1) {
            seconds = "0" + seconds;
          }
          
          return `${hours}:${minutes}:${seconds} ${ampm}`;
        };
          setInterval(fetchTime, 1000);

  //DELETE-ALARM
          function deleteAlarm (taskId) {
            const newTasks= alarms.filter(function(alarmString){
                return alarmString.id !== Number(taskId);
            });
            alarms=newTasks;
            renderList();
            
            
            
            }
  //ADD-ALARM
        function addAlarmToList(alarmString){
        //  console.log(alarmString);
          const li=document.createElement('li');

          li.innerHTML=
          `
          <label for="${alarmString.id}">${alarmString.data}</label>
          <img src="delete_FILL1_wght400_GRAD0_opsz48.png" class="delete" data-id="${alarmString.id}" />
          `
          taskList.append(li);


   
        }

  //ALARM-LIST
        function renderList () 
          {
          taskList.innerHTML='';
            for(let i=0;i<alarms.length;i++)
            {
              addAlarmToList(alarms[i]); 
            }
          }

      function addAlarm (alarmString) {
        alarms.push(alarmString);
        renderList();
      }
        
  //HANDLE ALARM-INPUT
      
    const handleAlarm = (event) => {
        event.preventDefault();
        var alarmString = {
          data: null,
          id:Date.now()
        };
        
        const { hour, sec, min, ampm } = document.forms[0];
        alarmString.data = convertTimeString({
          hours: hour.value,
          seconds: sec.value,
          minutes: min.value,
          ampm: ampm.value
        });
        // console.log(alarmString)
        document.forms[0].reset();
        addAlarm(alarmString);
      };


      function handleClickListner(e){
        const target=e.target;
        if(target.className==='delete'){
            const taskId=target.dataset.id;
           // console.log(taskId);
            deleteAlarm(taskId);
            return;
        }
    }


     
      document.forms[0].addEventListener("submit", handleAlarm);
     
      document.addEventListener('click',handleClickListner);

       setInterval(alarmAlert, 1000);
      
      function alarmAlert() {
     
          for(let i=0;i<alarms.length;i++)
          { var a=document.getElementById("current-time").innerHTML;
           var b= alarms[i].data
          if( a==b )
          {
            alert("Alarm Time");
        
          }
        }
          
        }

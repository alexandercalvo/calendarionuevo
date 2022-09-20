
let $d = document,
$calendarHeader = $d.createElement("section"),
$btnControlNext = $d.createElement("i"),
$btnControlPrevius = $d.createElement("i"),
$calendarBody = $d.createElement("aside"),
$calendarGrid = $d.createElement("section"),
$calendarGrid2 = $d.createElement("section"),
$calendarGridHeader = $d.createElement("section"),
$calendarGridHeader2 = $d.createElement("section"),
$titleMont1 = $d.createElement("span"),
$titleMont2 = $d.createElement("span"),
$calendarDay,
$checkin = $d.querySelector(".checkin"),
$checkout = $d.querySelector(".checkout"),
$containerCalendar = document.querySelector(".calendar");
$buttonCalendar = $d.querySelector(".buttonnCalendar");

moments = moment(),
monthCalendar1 = moments.format('MM'),
yearCalendar =  moments.format('YYYY'),
monthCalendar2 = moments.clone().add(1, 'month').format('MM'),
$continerCalendar = $d.querySelector("#calendar");
$titleMont1.classList.add("titleMonth1");
$titleMont2.classList.add("titleMonth2");
$calendarGridHeader.classList.add("grid_calendar");
$calendarGridHeader2.classList.add("grid_calendar2");
$calendarBody.classList.add("continer_calendar");
$btnControlPrevius.classList.add("fa-solid", "fa-circle-left");
$btnControlNext.classList.add("fa-solid", "fa-circle-right");
$calendarHeader.classList.add("heder__calendar")
const DAY_WEEK = ['DOM','LUN', 'MAR', 'MIE', 'JUE', 'VIE','SAB'];
const MONTHS = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL','MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OBTUBRE', 'NOVIEMBRE', 'DICIEMBRE']


//crea el calendario doble
const createCalendar = ($continerCalendar) =>{
    $calendarHeader.appendChild($btnControlPrevius);
    $titleMont1.textContent="MES 1"
    $titleMont2.textContent="MES 2"
    $calendarHeader.appendChild($titleMont1);
    $calendarHeader.appendChild($titleMont2);
    $calendarHeader.appendChild($btnControlNext);
    $calendarGrid.appendChild(generateHeader($calendarGridHeader));
    $calendarGrid2.appendChild(generateHeader($calendarGridHeader2));
    $calendarBody.append($calendarGrid);
    $calendarBody.append($calendarGrid2);
    $continerCalendar.appendChild($calendarHeader);
    $continerCalendar.appendChild($calendarBody);

}

//crea el encabezado del el calendario los dias de la semana
const generateHeader = (hederCalendar) =>{  
    for(let index =0; index < DAY_WEEK.length; index++ ){
        $calendarDay = $d.createElement("span");
        $calendarDay.classList.add("name_day");
        $calendarDay.textContent=DAY_WEEK[index];
        hederCalendar.appendChild($calendarDay);
    }
   
    return hederCalendar;
}

//metodo para saber cuantos dias tiene un mes
const getNumberDaysMonths = ( year, months) =>{
   return moment(year+months, "YYYY-MM").daysInMonth();
}

//metodo que retorna el dia de la semana en el que comienza el mes
const getDayWeekOnStart = (year, months, day) =>{
    return (moment(year+"-"+months+"-"+day).day()) ; 
}

//metodo para rellenar el calendario
const fillCalendar = (year, month, fistDay, calendarGridHeader, titleMont) =>{
    //obtiene el número del mes actual 
    const STARTLINE = fistDay+1;
    const ENDlINE = fistDay+2;
    
    const MONTHS_START=(month-1);
    titleMont.textContent=` ${MONTHS[MONTHS_START]} ${year}`;
    for(let index=1; index <= getNumberDaysMonths(year, month); index++){
        let day = $d.createElement("span");
        if(calendarGridHeader.matches(".grid_calendar2")){
            day.classList.add("calendarb");
        }else{
            day.classList.add("calendara");
        }
        day.classList.add("grid__cell", "grid__cell--gd");
        day.setAttribute("data-cell-id",`${index}` );
        if(index < 10){

        day.setAttribute("data-date", `${year}-${month}-0${index}`);
        }else{

        day.setAttribute("data-date", `${year}-${month}-${index}`);
        }
        day.setAttribute("id", `day${index}`);
        day.textContent=index;  
        
        calendarGridHeader.appendChild(day);
    }  
    calendarGridHeader.children[7].style.gridColumnStart = STARTLINE;
    calendarGridHeader.children[7].style.gridColumnEnd = ENDlINE;
   
}

const removeChild = (numberChild, continerCalendar) =>{
    for(let index=1; index<=numberChild; index++){ 
        continerCalendar.removeChild(continerCalendar.querySelector(`#day${index}`));      
    }
}

const comapareToDate = (firstDate, lastDate) =>{
    return moment(lastDate).isBefore(firstDate); 
}

//funcion para escuchar todos los eventos click del documento (calendario) html
const eventClick = () =>{
    $d.addEventListener("click", (e)=>{  
      console.log(e.target)
        if(e.target.matches(".root") || e.target=="body"){
            let daySelect = $d.querySelectorAll(".day__selected");

             $containerCalendar.classList.add("calendar-visibility");
            $checkin.textContent = daySelect[0].getAttribute("data-date");
            $checkout.textContent = daySelect[1].getAttribute("data-date");
         

        }
        if(e.target == $btnControlNext){   
            removeChild(getNumberDaysMonths(yearCalendar, monthCalendar2), $calendarGridHeader2);
            removeChild(getNumberDaysMonths(yearCalendar, monthCalendar1), $calendarGridHeader);
            monthCalendar1 = moments.add(1, 'month').format('MM');
            yearCalendar =  moments.format('YYYY');
            fistDayCalendar1 = getDayWeekOnStart(yearCalendar, monthCalendar1, "01");
            fillCalendar( yearCalendar ,monthCalendar1 ,fistDayCalendar1, $calendarGridHeader, $titleMont1 );
            monthCalendar2 = moments.clone().add(1, 'month').format("MM");
            let yearCalendar2 =  moments.clone().add(1, 'month').format("YYYY");
            fistDayCalendar2 = getDayWeekOnStart(yearCalendar2, monthCalendar2, "01");
            fillCalendar( yearCalendar2,monthCalendar2 ,fistDayCalendar2, $calendarGridHeader2, $titleMont2);  
         }
    
        if(e.target ==  $btnControlPrevius ){      
            removeChild(getNumberDaysMonths(yearCalendar, monthCalendar1), $calendarGridHeader);
            removeChild(getNumberDaysMonths(yearCalendar, monthCalendar2), $calendarGridHeader2);
            monthCalendar1 = moments.subtract(1, 'month').format('MM');
            yearCalendar =  moments.format('YYYY');
            fistDayCalendar1 = getDayWeekOnStart(yearCalendar, monthCalendar1, "01");
            fillCalendar( yearCalendar ,monthCalendar1 ,fistDayCalendar1, $calendarGridHeader, $titleMont1 );
            monthCalendar2 = moments.clone().add(1, 'month').format("MM");
            let yearCalendar2 =  moments.clone().add(1, 'month').format("YYYY");
            fistDayCalendar2 = getDayWeekOnStart(yearCalendar2, monthCalendar2, "01");
            fillCalendar( yearCalendar2,monthCalendar2 ,fistDayCalendar2, $calendarGridHeader2, $titleMont2);     

        }

        
        if(e.target.matches(".grid__cell")){
            let selected = $d.querySelectorAll(".day__selected");
        if(selected.length <2){
             e.target.classList.add("day__selected");
            if(selected.length >=1 && comapareToDate(selected[0].getAttribute("data-date"), e.target.getAttribute("data-date"))){
                
                
            selected[0].classList.remove("day__selected");
          
            e.target.classList.add("day__selected");

            }
        }else{
            removeHover();
            selected[0].classList.remove("day__selected");
            selected[1].classList.remove("day__selected");
            e.target.classList.add("day__selected");

        }
            
        }
 
    
        if(e.target== $buttonCalendar || e.target === $buttonCalendar.children[0] || e.target === $buttonCalendar.children[1] ||
            e.target === $buttonCalendar.children[2] ||  e.target === $buttonCalendar.children[3] ){
                $containerCalendar.classList.toggle("calendar-visibility");
               
        }
    });

}
createCalendar($continerCalendar);
firstDayCalendar1 = getDayWeekOnStart(yearCalendar, monthCalendar1, "01");
firstDayCalendar2 = getDayWeekOnStart(yearCalendar, monthCalendar2, "01");
fillCalendar( yearCalendar,monthCalendar2 ,firstDayCalendar2, $calendarGridHeader2, $titleMont2);
fillCalendar( yearCalendar ,monthCalendar1 ,firstDayCalendar1, $calendarGridHeader, $titleMont1 );

$d.addEventListener("DOMContentLoaded", ()=>{
    eventClick();

});
$d.addEventListener("mousemove", (e)=>{
  
    let dayMonths = $d.querySelectorAll(".grid__cell");
    let selected = $d.querySelectorAll(".day__selected");
    let $calendarb= document.querySelectorAll(".calendarb");
    let $calendara= document.querySelectorAll(".calendara");
    if(e.target.matches(".grid__cell")){
        
        if(selected.length >=1 && selected.length <2 ){
            removeHover();
            let start = selected[0].getAttribute("data-cell-id");
            let end = e.target.getAttribute("data-cell-id");
        
          
            if(selected[0].parentNode.matches(".grid_calendar") && e.target.parentNode.matches(".grid_calendar")){
                let dayMonths = $d.querySelectorAll(".grid__cell");
            
                if(!comapareToDate(selected[0].getAttribute("data-date"), e.target.getAttribute("data-date"))){
                    for(let index=parseInt(start); index<end-1; index++){
                     dayMonths[index].classList.add("in_range");
                    }  
        
                }
            }else if(selected[0].parentNode.matches(".grid_calendar2") && e.target.parentNode.matches(".grid_calendar2")){
                if(!comapareToDate(selected[0].getAttribute("data-date"), e.target.getAttribute("data-date"))){
            
                    for(let index=parseInt(start); index<end-1; index++){
                        $calendarb[index].classList.add("in_range");      
                     
                    }  
        
                }

            }else{
                console.log("el tamaño es"+$calendara.length);
                for(let index=parseInt(start); index<$calendara.length; index++){
                    $calendara[index].classList.add("in_range");      
                 
                }  
                for(let index=0; index<end-1; index++){
                    $calendarb[index].classList.add("in_range");      
                 
                }  

            }     
              
        }

       
    }

});


const removeHover = () =>{
    let $cellHover = $d.querySelectorAll(".in_range");
    $cellHover.forEach((elemento)=>{
        elemento.classList.remove("in_range");
    })
}

 $d.addEventListener("focus", (e)=>{
    console.log(e.target);
 })

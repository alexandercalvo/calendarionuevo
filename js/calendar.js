
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

let momento = moment("12-25-1995", "MM-DD-YYYY");

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


createCalendar($continerCalendar);



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

    if(month[0]==0){
        month = month[1];

    }

    const MONTHS_START=(month-1);
    titleMont.textContent=` ${MONTHS[MONTHS_START]} ${year}`;
    for(let index=1; index <= getNumberDaysMonths(year, month); index++){
        let day = $d.createElement("span");
        day.classList.add("grid__cell", "grid__cell--gd");
        day.setAttribute("data-cell-id",`${index}` );
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


let moments = moment()
let monthCalendar1 = moments.format('MM');
let yearCalendar =  moments.format('YYYY');
let fistDayCalendar1 = getDayWeekOnStart(yearCalendar, monthCalendar1, "01");
fillCalendar( yearCalendar ,monthCalendar1 ,fistDayCalendar1, $calendarGridHeader, $titleMont1 );
let monthCalendar2 = moments.clone().add(1, 'month').format('MM'),
fistDayCalendar2 = getDayWeekOnStart(yearCalendar, monthCalendar2, "01");
fillCalendar( yearCalendar,monthCalendar2 ,fistDayCalendar2, $calendarGridHeader2, $titleMont2);

console.log("el año es ", yearCalendar)

$d.addEventListener("DOMContentLoaded", ()=>{


});



$d.addEventListener("click", (e)=>{

  
    if(e.target == $btnControlNext){
        console.log(monthCalendar1);
       
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
});

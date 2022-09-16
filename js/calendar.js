
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
$btnControlNext.classList.add("fa-solid", "fa-circle-left");
$btnControlPrevius.classList.add("fa-solid", "fa-circle-right");
$calendarHeader.classList.add("heder__calendar")
const DAY_WEEK = ['DOM','LUN', 'MAR', 'MIE', 'JUE', 'VIE','SAB'];
const MONTHS = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL','MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OBTUBRE', 'NOVIEMBRE', 'DICIEMBRE']
let momento = moment("12-25-1995", "MM-DD-YYYY");


//crea el calendario doble
const createCalendar = ($continerCalendar) =>{
    $calendarHeader.appendChild($btnControlNext);
    $titleMont1.textContent="MES 1"
    $titleMont2.textContent="MES 2"
    $calendarHeader.appendChild($titleMont1);

    $calendarHeader.appendChild($titleMont2);
    $calendarHeader.appendChild($btnControlPrevius);

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
class Calendar {
    constructor(id) {
        this.cells = [];
        this.selectedDate = null;
        this.currentMonth = moment();
        this.elCalendar = document.getElementById(id);
        this.showTemplate();
        this.elGridBody = this.elCalendar.querySelector('.grid__body');
        this.elMonthName = this.elCalendar.querySelector('.month-name');
        this.showCells();
    }

    showTemplate() {
        this.elCalendar.innerHTML = this.getTemplate();
        this.addEventListenerToControls();
    }

    getTemplate() {
           

        let template = `
            <div class="calendar__header">
                <button type="button" class="control control--prev">&lt;</button>
                <span class="month-name">dic 2019</span>
                <button type="button" class="control control--next">&gt;</button>
            </div>
            <div class="calendar__body">
                <div class="grid">
                    <div class="grid__header">
                        <span class="grid__cell grid__cell--gh">Lun</span>
                        <span class="grid__cell grid__cell--gh">Mar</span>
                        <span class="grid__cell grid__cell--gh">Mié</span>
                        <span class="grid__cell grid__cell--gh">Jue</span>
                        <span class="grid__cell grid__cell--gh">Vie</span>
                        <span class="grid__cell grid__cell--gh">Sáb</span>
                        <span class="grid__cell grid__cell--gh">Dom</span>
                    </div>
                    <div class="grid__body">

                    </div>
                </div>
            </div>
        `;
        return template;
    }

    addEventListenerToControls() {
        let elControls = this.elCalendar.querySelectorAll('.control');
        elControls.forEach(elControl => {
            elControl.addEventListener('click', e => {
                let elTarget = e.target;
                if (elTarget.classList.contains('control--next')) {
                    this.changeMonth(true);
                } else {
                    this.changeMonth(false);
                }
                this.showCells();
            });
        });
    }

    changeMonth(next = true) {
        if (next) {
            this.currentMonth.add(1, 'months');
        } else {
            this.currentMonth.subtract(1, 'months');
        }
    }

    showCells() {
        this.cells = this.generateDates(this.currentMonth);
        if (this.cells === null) {
            console.error('No fue posible generar las fechas del calendario.');
            return;
        }

        this.elGridBody.innerHTML = '';
        let templateCells = '';
        let disabledClass = '';
        for (let i = 0; i < this.cells.length; i++) {
            disabledClass = '';
            if (!this.cells[i].isInCurrentMonth) {
                disabledClass = 'grid__cell--disabled';
            }
            // <span class="grid__cell grid__cell--gd grid__cell--selected">1</span>
            templateCells += `
                <span class="grid__cell grid__cell--gd ${disabledClass}" data-cell-id="${i}">
                    ${this.cells[i].date.date()}
                </span>
            `;
        }
        this.elMonthName.innerHTML = this.currentMonth.format('MMM YYYY');
        this.elGridBody.innerHTML = templateCells;
        this.addEventListenerToCells();
    }

    generateDates(monthToShow = moment()) {
        if (!moment.isMoment(monthToShow)) {
            return null;
        }
        let dateStart = moment(monthToShow).startOf('month');
        let dateEnd = moment(monthToShow).endOf('month');
        let cells = [];

        // Encontrar la primer fecha que se va a mostrar en el calendario
        while (dateStart.day() !== 1) {
            dateStart.subtract(1, 'days');
        }

        // Encontrar la última fecha que se va a mostrar en el calendario
        while (dateEnd.day() !== 0) {
            dateEnd.add(1, 'days');
        }

        // Genera las fechas del grid
        do {
            cells.push({
                date: moment(dateStart),
                isInCurrentMonth: dateStart.month() === monthToShow.month()
            });
            dateStart.add(1, 'days');
        } while (dateStart.isSameOrBefore(dateEnd));

        return cells;
    }

    addEventListenerToCells() {
        let elCells = this.elCalendar.querySelectorAll('.grid__cell--gd');
        elCells.forEach(elCell => {
            elCell.addEventListener('click', e => {
                let elTarget = e.target;
                if (elTarget.classList.contains('grid__cell--disabled') || elTarget.classList.contains('grid__cell--selected')) {
                    return;
                }
                // Deselecionar la celda anterior
                let selectedCell = this.elGridBody.querySelector('.grid__cell--selected');
                if (selectedCell) {
                    selectedCell.classList.remove('grid__cell--selected');
                }
                // Selecionar la nueva celda
                elTarget.classList.add('grid__cell--selected');
                this.selectedDate = this.cells[parseInt(elTarget.dataset.cellId)].date;
                // Lanzar evento change
                this.elCalendar.dispatchEvent(new Event('change'));
            });
        });
    }

    getElement() {
        return this.elCalendar;
    }

    value() {
        return this.selectedDate;
    }
}
let fecha = moment('2016-03-12');


let ayer = fecha.clone().subtract(9, 'day').format('LL');    
console.log(fecha);
console.log(ayer)

//metodo para saber cuantos dias tiene un mes
const getNumberDaysMonths = ( year, months) =>{
   return moment(year+months, "YYYY-MM").daysInMonth();

}

//metodo que retorna el dia de la semana en el que comienza el mes
const getDayWeekOnStart = (year, months, day) =>{
    return (moment(year+"-"+months+"-"+day).day()) ; 

}

//metodo para rellenar el calendario
const fillCalendar = (year, month, fistDay, calendarGridHeader) =>{
    //obtiene el número del mes actual
  
    const STARTLINE = fistDay+1;
    const ENDlINE = fistDay+2;
    for(let index=1; index <= getNumberDaysMonths(year, month); index++){
        let day = $d.createElement("span");
        day.classList.add("grid__cell", "grid__cell--gd");
        day.setAttribute("data-cell-id",`${index}` );
        day.textContent=index;  
        calendarGridHeader.appendChild(day);
    }  
    calendarGridHeader.children[7].style.gridColumnStart = STARTLINE;
    calendarGridHeader.children[7].style.gridColumnEnd = ENDlINE;
    

    
    
}
let month = moment().format('MM');
let year =  moment().format('YYYY');
let fistDay = getDayWeekOnStart(year, month, "01");
fillCalendar( year,month ,fistDay, $calendarGridHeader);
let mess = moment().add(1, 'month').format('MM');
fistDay = getDayWeekOnStart(year, mess, "01");
month = moment().format('MM')
console.log(mess )
fillCalendar( year,mess ,fistDay, $calendarGridHeader2);

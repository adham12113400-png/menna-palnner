// =======================================================
// بيانات النظام الشهري (30 يوم) والتمارين
// =======================================================

const monthlyWorkouts = [
    "push ( chest , sholder , trice )",
    "legs + glute",
    "sholder + arms + obliquse",
    "fullbody + glute",
    "arms + cor / obliques + cardio",
    "rest",
    "pull ( back )",
    "legs + glute",
    "shoulders + arms + obliquse",
    "fullbody + glutes",
    "arms + cor / obliquse",
    "rest",
    "push",
    "legs + glute",
    "sholders + arms",
    "fullbody + glute",
    "arms + cor + obliquse",
    "rest",
    "push",
    "legs + glute",
    "sholders + arms",
    "pull",
    "legs + glute",
    "push",
    "rest",
    "fullbody",
    "arms + cor",
    "legs + glute",
    "pull",
    "push"
];


// =======================================================
// بيانات جدول الأيام السبعة
// =======================================================

const weeklyDays = [
    "السبت (Saturday)",
    "الأحد (Sunday)",
    "الإثنين (Monday)",
    "الثلاثاء (Tuesday)",
    "الأربعاء (Wednesday)",
    "الخميس (Thursday)",
    "الجمعة (Friday)"
];


// =======================================================
// الروتين اليومي
// =======================================================

const dailyRoutine = [

    {
        time: "5:00 ص",
        task: "صلاة الفجر + الأذكار + تجهيز الطعام"
    },

    {
        time: "7:00 ص",
        task: "التمرين"
    },

    {
        time: "9:00 ص",
        task: "الإفطار"
    },

    {
        time: "10:00 ص",
        task: "التعليم"
    },

    {
        time: "12:00 م",
        task: "الورد اليومي"
    },

    {
        time: "3:00 م",
        task: "الغداء + الأذكار"
    },

    {
        time: "7:00 م",
        task: "سناك"
    },

    {
        time: "8:00 م",
        task: "وجبة العشاء"
    },

    {
        time: "10:00 م",
        task: "صلاة العشاء + قيام الليل"
    },

    {
        time: "11:00 م",
        task: "موعد النوم"
    }

];


// =======================================================
// التبديل بين الجدول الأسبوعي والشهري
// =======================================================

function switchTab(tabName) {

    document
        .querySelectorAll('.tab-btn')
        .forEach(btn => {
            btn.classList.remove('active');
        });

    document
        .querySelectorAll('.tab-content')
        .forEach(content => {
            content.classList.remove('active-content');
        });


    if (tabName === 'weekly') {

        document
            .querySelector(
                '[onclick="switchTab(\'weekly\')"]'
            )
            .classList.add('active');

        document
            .getElementById('weekly-tab')
            .classList.add('active-content');

    } else {

        document
            .querySelector(
                '[onclick="switchTab(\'monthly\')"]'
            )
            .classList.add('active');

        document
            .getElementById('monthly-tab')
            .classList.add('active-content');

    }

}


// =======================================================
// بناء الجدول الأسبوعي
// =======================================================

function renderWeeklySchedule() {

    const weeklyListContainer =
        document.getElementById('weeklyList');

    weeklyListContainer.innerHTML = '';


    weeklyDays.forEach((day, index) => {

        const dayKey =
            `weekly-day-${index}`;

        const isCompleted =
            localStorage.getItem(dayKey) === 'true';


        // إنشاء كارد اليوم

        const card =
            document.createElement('div');

        card.className =
            `weekly-day-card ${
                isCompleted ? 'completed' : ''
            }`;

        card.id =
            `weekly-card-${index}`;


        // بناء تفاصيل اليوم

        let routineHTML = '';


        dailyRoutine.forEach(slot => {

            routineHTML += `
                <div class="time-slot">

                    <span class="time-badge">
                        ${slot.time}
                    </span>

                    <span class="task-name">
                        ${slot.task}
                    </span>

                </div>
            `;

        });


        // محتوى الكارد

        card.innerHTML = `

            <div class="day-header">

                <div
                    class="day-info"
                    onclick="toggleDetails(${index})"
                >

                    <span class="day-emoji">
                        🗓️
                    </span>

                    <span class="day-name">
                        ${day}
                    </span>

                </div>


                <div
                    class="checkbox-box ${
                        isCompleted ? 'checked' : ''
                    }"
                    onclick="
                        toggleWeeklyComplete(
                            ${index},
                            event
                        )
                    "
                >

                    <span class="custom-checkbox"></span>

                </div>

            </div>


            <div
                class="day-details"
                id="details-${index}"
            >

                ${routineHTML}

            </div>

        `;


        weeklyListContainer.appendChild(card);

    });

}


// =======================================================
// فتح وإغلاق تفاصيل اليوم
// =======================================================

function toggleDetails(index) {

    const detailsDiv =
        document.getElementById(
            `details-${index}`
        );

    detailsDiv.classList.toggle('expanded');

}


// =======================================================
// تحديد اليوم كمكتمل - الأسبوعي
// =======================================================

function toggleWeeklyComplete(index, event) {

    event.stopPropagation();


    const dayKey =
        `weekly-day-${index}`;


    const card =
        document.getElementById(
            `weekly-card-${index}`
        );


    const checkboxBox =
        card.querySelector(
            '.checkbox-box'
        );


    const isCompleted =
        localStorage.getItem(dayKey) === 'true';


    const nextState =
        !isCompleted;


    localStorage.setItem(
        dayKey,
        nextState
    );


    if (nextState) {

        card.classList.add('completed');

        checkboxBox.classList.add('checked');

    } else {

        card.classList.remove('completed');

        checkboxBox.classList.remove('checked');

    }

}


// =======================================================
// بناء الجدول الشهري
// =======================================================

function renderMonthlyGrid() {

    const monthlyGridContainer =
        document.getElementById('monthlyGrid');

    monthlyGridContainer.innerHTML = '';


    monthlyWorkouts.forEach((workout, index) => {

        const dayNum =
            index + 1;


        const monthKey =
            `monthly-day-${dayNum}`;


        const isCompleted =
            localStorage.getItem(monthKey) === 'true';


        const card =
            document.createElement('div');


        card.className =
            `monthly-card ${
                isCompleted ? 'completed' : ''
            }`;


        card.id =
            `monthly-card-${dayNum}`;


        card.innerHTML = `

            <div class="card-top">

                <span class="day-number">
                    يوم ${dayNum}
                </span>


                <div
                    class="checkbox-box ${
                        isCompleted ? 'checked' : ''
                    }"
                    onclick="
                        toggleMonthlyComplete(
                            ${dayNum}
                        )
                    "
                >

                    <span class="custom-checkbox"></span>

                </div>

            </div>


            <div class="workout-text">

                ${workout}

            </div>

        `;


        monthlyGridContainer.appendChild(card);

    });

}


// =======================================================
// تحديد اليوم كمكتمل - الشهري
// =======================================================

function toggleMonthlyComplete(dayNum) {

    const monthKey =
        `monthly-day-${dayNum}`;


    const card =
        document.getElementById(
            `monthly-card-${dayNum}`
        );


    const checkboxBox =
        card.querySelector(
            '.checkbox-box'
        );


    const isCompleted =
        localStorage.getItem(monthKey) === 'true';


    const nextState =
        !isCompleted;


    localStorage.setItem(
        monthKey,
        nextState
    );


    if (nextState) {

        card.classList.add('completed');

        checkboxBox.classList.add('checked');

    } else {

        card.classList.remove('completed');

        checkboxBox.classList.remove('checked');

    }

}


// =======================================================
// RESET الجدول الأسبوعي
// =======================================================

function resetWeekly() {

    const confirmReset = confirm(
        "هل أنتِ متأكدة من إعادة ضبط الجدول الأسبوعي؟\n\n" +
        "سيتم إلغاء علامة الإنجاز لجميع أيام الأسبوع."
    );


    if (!confirmReset) {
        return;
    }


    // حذف حالات الأيام السبعة فقط

    weeklyDays.forEach((day, index) => {

        localStorage.removeItem(
            `weekly-day-${index}`
        );

    });


    // إعادة بناء الجدول

    renderWeeklySchedule();

}


// =======================================================
// RESET الجدول الشهري
// =======================================================

function resetMonthly() {

    const confirmReset = confirm(
        "هل أنتِ متأكدة من إعادة ضبط التحدي الشهري؟\n\n" +
        "سيتم إلغاء علامة الإنجاز لجميع أيام الـ30 يوم."
    );


    if (!confirmReset) {
        return;
    }


    // حذف حالات الـ30 يوم فقط

    monthlyWorkouts.forEach((workout, index) => {

        const dayNum =
            index + 1;


        localStorage.removeItem(
            `monthly-day-${dayNum}`
        );

    });


    // إعادة بناء الجدول

    renderMonthlyGrid();

}


// =======================================================
// تشغيل الموقع عند فتح الصفحة
// =======================================================

window.onload = function () {

    renderWeeklySchedule();

    renderMonthlyGrid();

};
let tasks = [];

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskTime = document.getElementById("taskTime");

    let taskText = taskInput.value.trim();
    let time = parseInt(taskTime.value);

    if (taskText === "" || isNaN(time) || time <= 0) {
        alert("الرجاء إدخال مهمة ووقت صحيح!");
        return;
    }

    tasks.push({ text: taskText, time: time, completed: false, addedAt: new Date() });
    taskInput.value = "";
    taskTime.value = "";
    updateTaskList();
    generateAISuggestion();
    analyzeWeeklyProgress();
}

function updateTaskList() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.sort((a, b) => a.time - b.time); // ترتيب المهام حسب الوقت المطلوب

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.textContent = `${task.text} - ⏳ ${task.time} دقيقة`;
        li.className = task.completed ? "completed" : "";
        
        li.onclick = () => toggleTask(index);
        
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            deleteTask(index);
        };

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    generateAISuggestion();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateTaskList();
    generateAISuggestion();
    analyzeWeeklyProgress();
}

function generateAISuggestion() {
    let aiSuggestion = document.getElementById("aiSuggestion");

    if (tasks.length === 0) {
        aiSuggestion.textContent = "أضف مهامًا وسنقترح عليك كيفية تنظيم وقتك!";
        return;
    }

    let pendingTasks = tasks.filter(task => !task.completed);
    let totalTime = pendingTasks.reduce((sum, task) => sum + task.time, 0);

    if (totalTime > 180) {
        aiSuggestion.textContent = "جدولك مزدحم جدًا! حاول تقليل المهام أو تقسيمها إلى أجزاء صغيرة.";
    } else if (pendingTasks.length > 3) {
        aiSuggestion.textContent = "ابدأ بالمهمة الأسرع لإنجازها أولًا، ثم انتقل إلى المهام الأطول.";
    } else {
        aiSuggestion.textContent = "🚀 أنت قريب من إنهاء مهامك! استمر في العمل!";
    }
}

function analyzeWeeklyProgress() {
    let weeklyAnalysis = document.getElementById("weeklyAnalysis");

    let completedTasks = tasks.filter(task => task.completed).length;
    let totalTasks = tasks.length;

    if (totalTasks === 0) {
        weeklyAnalysis.textContent = "لم تبدأ أي مهام بعد!";
        return;
    }

    let progress = Math.round((completedTasks / totalTasks) * 100);
    
    if (progress === 100) {
        weeklyAnalysis.textContent = "🔥 أداء رائع! أكملت جميع مهامك هذا الأسبوع!";
    } else if (progress >= 50) {
        weeklyAnalysis.textContent = `👍 تقدم جيد! أكملت ${progress}% من مهامك.`;
    } else {
        weeklyAnalysis.textContent = `⚠️ تحتاج إلى بذل مجهود أكبر، أنجزت فقط ${progress}% من مهامك.`;
    }
}

// إشعار بوقت المهمة إذا مرت أكثر من ساعتين ولم تُنجز
setInterval(() => {
    let now = new Date();
    tasks.forEach(task => {
        if (!task.completed) {
            let elapsedMinutes = (now - task.addedAt) / (1000 * 60);
            if (elapsedMinutes > 120) {
                alert(`🚨 لقد مر أكثر من ساعتين على المهمة: "${task.text}". حان الوقت لإنهائها!`);
            }
        }
    });
}, 60000);

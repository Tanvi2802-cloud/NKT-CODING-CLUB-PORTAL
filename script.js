// ==================== Section Switching ====================
function showSection(sectionId){
  document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(sectionId).classList.add("active");
  document.querySelectorAll(".nav-item").forEach(link => link.classList.remove("active"));
  document.querySelector(`.nav-item[data-section="${sectionId}"]`).classList.add("active");
}

document.querySelectorAll(".nav-item").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    showSection(link.dataset.section);
  });
});

// ==================== Typing Effect ====================
const typingText = "Welcome to NKT Coding Club!";
const typingElement = document.getElementById("typing-text");
let index = 0;
function typeWriter() {
  if(index < typingText.length) {
    typingElement.textContent += typingText.charAt(index);
    index++;
    setTimeout(typeWriter, 100);
  }
}
window.onload = () => { typingElement.textContent = ""; typeWriter(); };

// ==================== Matrix Background ====================
const canvas = document.getElementById("matrixBackground");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight; canvas.width = window.innerWidth;
const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 16;
let columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

function draw() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "#0F0";
  ctx.font = fontSize + "px monospace";
  for(let i=0;i<drops.length;i++){
    const text = letters[Math.floor(Math.random()*letters.length)];
    ctx.fillText(text,i*fontSize,drops[i]*fontSize);
    if(drops[i]*fontSize>canvas.height && Math.random()>0.975) drops[i]=0;
    drops[i]++;
  }
}
setInterval(draw, 33);
window.addEventListener("resize", () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  columns = Math.floor(canvas.width / fontSize);
  for(let x=0;x<columns;x++){drops[x]=1;}
});

// ==================== Contact Form ====================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  form.addEventListener("submit", e => {
    e.preventDefault();
    alert("✅ Thank you! Your message has been sent.");
    form.reset();
  });
});

// ==================== Team & Member Modals ====================
const members = [
  {
    name:"Kumbhar Tanvi Hanmant", team:"Frontend", role:"Frontend Developer", photo:"tanvi.jpeg",
    github:"https://github.com/Tanvi2802-cloud",
    about:"Tanvi is a passionate Frontend Developer skilled in creating responsive and user-friendly web interfaces. She focuses on transforming designs into interactive websites while ensuring a seamless user experience. Tanvi actively contributes to projects, collaborates with team members, and continuously learns new frontend technologies to enhance her development skills."
  },
  {
    name:"Shinde Gopal Laxman", team:"Frontend", role:"Frontend Developer", photo:"gopal.jpeg",
    github:"https://github.com/Gopal2709-spec",
    about:"Gopal is a dedicated Frontend Developer with a keen eye for design and functionality. He specializes in building responsive, interactive, and user-friendly web interfaces. Gopal actively contributes to team projects, collaborates effectively with colleagues, and continually explores new frontend technologies to enhance his skills and deliver high-quality web experiences."
  },
  {
    name:"Radhika Narayankar", team:"Frontend", role:"Developer", photo:"radhika.jpeg",
    github:"#", about:""
  }
];

const teamData = {
  frontend: { desc:"Bringing designs to life! Our frontend team creates user-friendly, visually appealing interfaces using HTML, CSS, and JavaScript.", members },
  backend: { desc:"Powering the logic behind the scenes! Our backend team manages servers, APIs, and data flow to ensure smooth, reliable performance.", members },
  database: { desc:"Guardians of data! The database team organizes, stores, and secures information efficiently.", members },
  aiml: { desc:"Turning data into intelligence! Our AI/ML team builds smart models and algorithms to create innovative, automated solutions.", members }
};

const teamInfo=document.getElementById("teamInfo");
const teamTitle=document.getElementById("teamTitle");
const teamDescription=document.getElementById("teamDescription");
const memberButtons=document.getElementById("memberButtons");
const memberCards=document.getElementById("memberCards");

// Modal elements
const modal=document.getElementById("modal");
const modalImg=document.getElementById("modalImg");
const modalName=document.getElementById("modalName");
const modalTeam=document.getElementById("modalTeam");
const modalRole=document.getElementById("modalRole");
const modalGitHub=document.getElementById("modalGitHub");
const modalAbout=document.getElementById("modalAbout");

function selectTeam(team){
  teamInfo.style.display="block";
  teamTitle.textContent = team.charAt(0).toUpperCase()+team.slice(1) + " Team";
  teamDescription.textContent = teamData[team].desc;
  memberButtons.innerHTML="";
  memberCards.innerHTML="";
  const btn=document.createElement("button");
  btn.textContent="Show Members";
  btn.onclick = ()=>showMembers(team);
  memberButtons.appendChild(btn);
}

function showMembers(team){
  memberCards.innerHTML="";
  const membersRepeated = [];
  for(let i=0;i<3;i++){membersRepeated.push(...teamData[team].members);}
  membersRepeated.forEach(m => {
    const div=document.createElement("div");
    div.className="member-card";
    div.innerHTML=`<img src="${m.photo}" alt="${m.name}"><h4 class="member-name">${m.name}</h4><p>${m.role}</p>`;
    memberCards.appendChild(div);
    const img=div.querySelector("img");
    const name=div.querySelector(".member-name");
    img.onclick=name.onclick=()=>openProfileModal(m);
  });
}

function openProfileModal(member){
  modal.style.display="block";
  modalImg.src=member.photo;
  modalName.textContent=member.name;
  modalTeam.textContent=member.team;
  modalRole.textContent=member.role;
  modalGitHub.href=member.github;
  modalGitHub.textContent=member.github;
  modalAbout.textContent=member.about;
}

function closeModal(){modal.style.display="none";}

// ==================== Experience Slideshow ====================
document.querySelectorAll(".experience-slideshow").forEach(slideshow => {
  let slides = slideshow.querySelectorAll(".experience-card");
  let index = 0;

  function showSlide() {
    slides.forEach((slide, i) => {
      slide.style.display = (i === index) ? "flex" : "none";
    });
    index = (index + 1) % slides.length;
  }

  showSlide();
  setInterval(showSlide, 3000);
});

// ==================== Member Attendance Section ====================
let attendanceRecord = {}; // { "YYYY-MM-DD": [{name, class}] }

function memberLogin() {
  const username = document.getElementById("memberUsername").value;
  const password = document.getElementById("memberPassword").value;
  const error = document.getElementById("attendanceError");

  if(username === "user123" && password === "member@123"){
    document.getElementById("attendanceLogin").style.display = "none";
    document.getElementById("attendanceMark").style.display = "block";
    error.textContent = "";
  } else {
    error.textContent = "Invalid username or password!";
  }
}

function markAttendance() {
  const name = document.getElementById("attendanceName").value.trim();
  const className = document.getElementById("attendanceClass").value.trim();
  const msg = document.getElementById("attendanceMsg");
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  if(!name || !className){
    msg.textContent = "❌ Please enter both Name and Class!";
    return;
  }

  if(!attendanceRecord[today]) attendanceRecord[today] = [];

  // Check if already marked today
  const exists = attendanceRecord[today].find(a => a.name === name && a.class === className);
  if(exists){
    msg.textContent = "✅ You have already marked your attendance today!";
  } else {
    attendanceRecord[today].push({ name, class: className });
    msg.textContent = "🎉 Attendance marked for today!";
    document.getElementById("attendanceName").value = "";
    document.getElementById("attendanceClass").value = "";
  }
}

// ==================== Admin Dashboard ====================
function loadAttendanceData() {
  const table = document.getElementById('attendanceTable');
  table.innerHTML = '';

  const dates = Object.keys(attendanceRecord).sort();
  if(dates.length === 0){
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="3" style="text-align:center; color:#ff7dee;">No attendance recorded yet</td>`;
    table.appendChild(row);
    return;
  }

  dates.forEach(date => {
    attendanceRecord[date].forEach(record => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${record.name}</td><td>${record.class}</td><td>${date}</td>`;
      table.appendChild(row);
    });
  });
}


// ==================== Admin Section ====================
function openAdminLogin() {
  document.getElementById('adminModal').style.display = 'flex';
}
function closeAdminLogin() {
  document.getElementById('adminModal').style.display = 'none';
  document.getElementById('adminError').innerText = '';
}

function adminLogin() {
  const username = document.getElementById('adminUsername').value;
  const password = document.getElementById('adminPassword').value;
  if(username === 'user123' && password === 'admin@123'){
    closeAdminLogin();
    openAdminDashboard();
    loadAttendanceData();
  } else {
    document.getElementById('adminError').innerText = 'Invalid username or password!';
  }
}

function openAdminDashboard() {
  document.getElementById('adminDashboard').style.display = 'flex';
}
function closeAdminDashboard() {
  document.getElementById('adminDashboard').style.display = 'none';
}

function loadAttendanceData() {
  const table = document.getElementById('attendanceTable');
  table.innerHTML = '';

  const dates = Object.keys(attendanceRecord).sort();
  if(dates.length === 0){
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="2" style="text-align:center; color:#ff7dee;">No attendance recorded yet</td>`;
    table.appendChild(row);
    return;
  }

  dates.forEach(date => {
    const names = attendanceRecord[date];
    names.forEach(name => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${name}</td><td>${date}</td>`;
      table.appendChild(row);
    });
  });
}

// ==================== Attendance Modal Open/Close ====================

// Open Attendance Login Modal
function openAttendanceLogin() {
  document.getElementById('attendanceModal').style.display = 'flex';
}

// Close Attendance Login Modal
function closeAttendanceLogin() {
  document.getElementById('attendanceModal').style.display = 'none';
  document.getElementById('attendanceError').textContent = '';
}

// Call this function when Attendance section is clicked
document.querySelector('.nav-item[data-section="attendance"]').addEventListener('click', () => {
  openAttendanceLogin();
});

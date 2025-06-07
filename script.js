// Dashboard Admin Script - Digital Marketing Learning Platform
// Using ES6+ Modules and Modern JavaScript

class DashboardManager {
    constructor() {
        this.currentSection = 'overview';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadInitialData();
        this.setupCharts();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.switchSection(section);
            });
        });

        // Mobile menu toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const sidebar = document.querySelector('.sidebar');
        
        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                sidebar.classList.toggle('open');
            });
        }

        // Search functionality
        const searchInput = document.querySelector('.search-box input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        // Settings form
        const settingsForm = document.querySelector('.settings-form');
        if (settingsForm) {
            settingsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveSettings();
            });
        }
    }

    switchSection(sectionName) {
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

        // Update content
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionName).classList.add('active');

        // Update page title
        const titles = {
            overview: 'Dashboard Overview',
            students: 'Manajemen Mahasiswa',
            courses: 'Mata Kuliah Digital Marketing',
            'ai-agents': 'AI Agents Management',
            assignments: 'Manajemen Tugas',
            analytics: 'Analytics & Reports',
            settings: 'Pengaturan Platform'
        };
        
        document.getElementById('page-title').textContent = titles[sectionName];
        this.currentSection = sectionName;

        // Load section-specific data
        this.loadSectionData(sectionName);
    }

    loadInitialData() {
        this.loadStudentsData();
        this.loadCoursesData();
        this.loadAIAgentsData();
        this.loadAssignmentsData();
    }

    loadStudentsData() {
        const studentsData = [
            {
                id: 1,
                name: 'Ahmad Rizki Pratama',
                nim: '2021001001',
                email: 'ahmad.rizki@student.ac.id',
                progress: 85,
                status: 'active'
            },
            {
                id: 2,
                name: 'Siti Nurhaliza',
                nim: '2021001002',
                email: 'siti.nurhaliza@student.ac.id',
                progress: 92,
                status: 'active'
            },
            {
                id: 3,
                name: 'Budi Santoso',
                nim: '2021001003',
                email: 'budi.santoso@student.ac.id',
                progress: 78,
                status: 'active'
            },
            {
                id: 4,
                name: 'Maya Sari',
                nim: '2021001004',
                email: 'maya.sari@student.ac.id',
                progress: 65,
                status: 'pending'
            },
            {
                id: 5,
                name: 'Doni Prasetyo',
                nim: '2021001005',
                email: 'doni.prasetyo@student.ac.id',
                progress: 88,
                status: 'active'
            }
        ];

        this.renderStudentsTable(studentsData);
    }

    renderStudentsTable(students) {
        const tbody = document.getElementById('students-table-body');
        if (!tbody) return;

        tbody.innerHTML = students.map(student => `
            <tr>
                <td>${student.name}</td>
                <td>${student.nim}</td>
                <td>${student.email}</td>
                <td>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${student.progress}%"></div>
                    </div>
                    <span style="font-size: 0.8rem; color: #666; margin-left: 0.5rem;">${student.progress}%</span>
                </td>
                <td>
                    <span class="status-badge status-${student.status}">
                        ${student.status === 'active' ? 'Aktif' : student.status === 'pending' ? 'Pending' : 'Tidak Aktif'}
                    </span>
                </td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="dashboard.editStudent(${student.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="dashboard.deleteStudent(${student.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    loadCoursesData() {
        const coursesData = [
            {
                id: 1,
                title: 'Fundamentals of Digital Marketing',
                description: 'Pengenalan dasar-dasar pemasaran digital, strategi, dan tools yang digunakan.',
                students: 45,
                modules: 8,
                status: 'active'
            },
            {
                id: 2,
                title: 'Social Media Marketing',
                description: 'Strategi pemasaran melalui platform media sosial dan content creation.',
                students: 38,
                modules: 6,
                status: 'active'
            },
            {
                id: 3,
                title: 'Search Engine Optimization',
                description: 'Teknik optimasi website untuk mesin pencari dan analisis keyword.',
                students: 42,
                modules: 10,
                status: 'active'
            },
            {
                id: 4,
                title: 'Google Ads & PPC Marketing',
                description: 'Manajemen kampanye iklan berbayar dan optimasi ROI.',
                students: 35,
                modules: 7,
                status: 'active'
            }
        ];

        this.renderCoursesGrid(coursesData);
    }

    renderCoursesGrid(courses) {
        const grid = document.getElementById('courses-grid');
        if (!grid) return;

        grid.innerHTML = courses.map(course => `
            <div class="course-card">
                <div class="card-header">
                    <h3 class="card-title">${course.title}</h3>
                    <p class="card-description">${course.description}</p>
                </div>
                <div class="card-body">
                    <div class="card-meta">
                        <span><i class="fas fa-users"></i> ${course.students} mahasiswa</span>
                        <span><i class="fas fa-book"></i> ${course.modules} modul</span>
                    </div>
                    <div class="card-actions">
                        <button class="btn btn-sm btn-primary" onclick="dashboard.editCourse(${course.id})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-sm btn-secondary" onclick="dashboard.viewCourse(${course.id})">
                            <i class="fas fa-eye"></i> Lihat
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    loadAIAgentsData() {
        const agentsData = [
            {
                id: 1,
                name: 'Marketing Assistant',
                type: 'Content Creator',
                description: 'AI agent untuk membantu membuat konten marketing dan copywriting.',
                status: 'active',
                interactions: 1250
            },
            {
                id: 2,
                name: 'SEO Analyzer',
                type: 'Technical Assistant',
                description: 'Menganalisis dan memberikan rekomendasi SEO untuk website.',
                status: 'active',
                interactions: 890
            },
            {
                id: 3,
                name: 'Social Media Scheduler',
                type: 'Automation',
                description: 'Mengelola jadwal posting dan engagement di media sosial.',
                status: 'active',
                interactions: 2100
            },
            {
                id: 4,
                name: 'Campaign Optimizer',
                type: 'Analytics',
                description: 'Mengoptimalkan performa kampanye digital marketing.',
                status: 'active',
                interactions: 675
            }
        ];

        this.renderAIAgentsGrid(agentsData);
    }

    renderAIAgentsGrid(agents) {
        const grid = document.getElementById('agents-grid');
        if (!grid) return;

        grid.innerHTML = agents.map(agent => `
            <div class="agent-card">
                <div class="card-header">
                    <h3 class="card-title">${agent.name}</h3>
                    <p class="card-description">${agent.description}</p>
                </div>
                <div class="card-body">
                    <div class="card-meta">
                        <span><i class="fas fa-robot"></i> ${agent.type}</span>
                        <span><i class="fas fa-chart-line"></i> ${agent.interactions} interaksi</span>
                    </div>
                    <div style="margin: 1rem 0;">
                        <span class="status-badge status-${agent.status}">
                            ${agent.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                        </span>
                    </div>
                    <div class="card-actions">
                        <button class="btn btn-sm btn-primary" onclick="dashboard.configureAgent(${agent.id})">
                            <i class="fas fa-cog"></i> Konfigurasi
                        </button>
                        <button class="btn btn-sm btn-secondary" onclick="dashboard.viewAgentLogs(${agent.id})">
                            <i class="fas fa-history"></i> Log
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    loadAssignmentsData() {
        const assignmentsData = [
            {
                id: 1,
                title: 'Analisis Kompetitor Digital',
                course: 'Fundamentals of Digital Marketing',
                dueDate: '2024-02-15',
                submissions: 28,
                totalStudents: 45,
                status: 'active'
            },
            {
                id: 2,
                title: 'Strategi Content Marketing',
                course: 'Social Media Marketing',
                dueDate: '2024-02-20',
                submissions: 15,
                totalStudents: 38,
                status: 'active'
            },
            {
                id: 3,
                title: 'Audit SEO Website',
                course: 'Search Engine Optimization',
                dueDate: '2024-02-25',
                submissions: 8,
                totalStudents: 42,
                status: 'active'
            }
        ];

        this.renderAssignments(assignmentsData);
    }

    renderAssignments(assignments) {
        const container = document.getElementById('assignments-container');
        if (!container) return;

        container.innerHTML = assignments.map(assignment => {
            const completionRate = Math.round((assignment.submissions / assignment.totalStudents) * 100);
            return `
                <div class="course-card">
                    <div class="card-header">
                        <h3 class="card-title">${assignment.title}</h3>
                        <p class="card-description">${assignment.course}</p>
                    </div>
                    <div class="card-body">
                        <div class="card-meta">
                            <span><i class="fas fa-calendar"></i> ${new Date(assignment.dueDate).toLocaleDateString('id-ID')}</span>
                            <span><i class="fas fa-users"></i> ${assignment.submissions}/${assignment.totalStudents}</span>
                        </div>
                        <div style="margin: 1rem 0;">
                            <div class="progress-bar" style="width: 100%;">
                                <div class="progress-fill" style="width: ${completionRate}%"></div>
                            </div>
                            <span style="font-size: 0.8rem; color: #666; margin-top: 0.5rem; display: block;">
                                ${completionRate}% selesai
                            </span>
                        </div>
                        <div class="card-actions">
                            <button class="btn btn-sm btn-primary" onclick="dashboard.viewSubmissions(${assignment.id})">
                                <i class="fas fa-eye"></i> Lihat Submission
                            </button>
                            <button class="btn btn-sm btn-secondary" onclick="dashboard.editAssignment(${assignment.id})">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    setupCharts() {
        // Performance Chart
        const performanceCtx = document.getElementById('performanceChart');
        if (performanceCtx) {
            this.createPerformanceChart(performanceCtx);
        }

        // Engagement Chart
        const engagementCtx = document.getElementById('engagementChart');
        if (engagementCtx) {
            this.createEngagementChart(engagementCtx);
        }

        // Progress Chart
        const progressCtx = document.getElementById('progressChart');
        if (progressCtx) {
            this.createProgressChart(progressCtx);
        }
    }

    createPerformanceChart(ctx) {
        // Simple chart implementation without external libraries
        const canvas = ctx;
        const context = canvas.getContext('2d');
        
        // Set canvas size
        canvas.width = canvas.offsetWidth;
        canvas.height = 300;
        
        // Sample data
        const data = [65, 70, 75, 80, 85, 88, 90];
        const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
        
        this.drawLineChart(context, data, labels, canvas.width, canvas.height);
    }

    createEngagementChart(ctx) {
        const canvas = ctx;
        const context = canvas.getContext('2d');
        
        canvas.width = canvas.offsetWidth;
        canvas.height = 300;
        
        const data = [45, 52, 48, 61, 58, 65, 70];
        const labels = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
        
        this.drawBarChart(context, data, labels, canvas.width, canvas.height);
    }

    createProgressChart(ctx) {
        const canvas = ctx;
        const context = canvas.getContext('2d');
        
        canvas.width = canvas.offsetWidth;
        canvas.height = 300;
        
        const data = [
            { label: 'Selesai', value: 65, color: '#28a745' },
            { label: 'Dalam Progress', value: 25, color: '#ffc107' },
            { label: 'Belum Mulai', value: 10, color: '#dc3545' }
        ];
        
        this.drawPieChart(context, data, canvas.width, canvas.height);
    }

    drawLineChart(ctx, data, labels, width, height) {
        const padding = 40;
        const chartWidth = width - 2 * padding;
        const chartHeight = height - 2 * padding;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Draw axes
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.stroke();
        
        // Draw data line
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        const stepX = chartWidth / (data.length - 1);
        const maxValue = Math.max(...data);
        
        data.forEach((value, index) => {
            const x = padding + index * stepX;
            const y = height - padding - (value / maxValue) * chartHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Draw data points
        ctx.fillStyle = '#667eea';
        data.forEach((value, index) => {
            const x = padding + index * stepX;
            const y = height - padding - (value / maxValue) * chartHeight;
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
        });
    }

    drawBarChart(ctx, data, labels, width, height) {
        const padding = 40;
        const chartWidth = width - 2 * padding;
        const chartHeight = height - 2 * padding;
        
        ctx.clearRect(0, 0, width, height);
        
        const barWidth = chartWidth / data.length * 0.8;
        const barSpacing = chartWidth / data.length * 0.2;
        const maxValue = Math.max(...data);
        
        ctx.fillStyle = '#667eea';
        
        data.forEach((value, index) => {
            const x = padding + index * (barWidth + barSpacing) + barSpacing / 2;
            const barHeight = (value / maxValue) * chartHeight;
            const y = height - padding - barHeight;
            
            ctx.fillRect(x, y, barWidth, barHeight);
        });
    }

    drawPieChart(ctx, data, width, height) {
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 2 - 40;
        
        ctx.clearRect(0, 0, width, height);
        
        const total = data.reduce((sum, item) => sum + item.value, 0);
        let currentAngle = -Math.PI / 2;
        
        data.forEach(item => {
            const sliceAngle = (item.value / total) * 2 * Math.PI;
            
            ctx.fillStyle = item.color;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.closePath();
            ctx.fill();
            
            currentAngle += sliceAngle;
        });
    }

    loadSectionData(section) {
        // Load specific data when switching sections
        switch (section) {
            case 'analytics':
                // Refresh charts
                setTimeout(() => this.setupCharts(), 100);
                break;
            default:
                break;
        }
    }

    handleSearch(query) {
        console.log('Searching for:', query);
        // Implement search functionality
    }

    saveSettings() {
        const platformName = document.getElementById('platform-name').value;
        const semester = document.getElementById('semester').value;
        
        console.log('Saving settings:', { platformName, semester });
        
        // Show success message
        alert('Pengaturan berhasil disimpan!');
    }

    // Action methods
    editStudent(id) {
        console.log('Edit student:', id);
        alert(`Edit mahasiswa dengan ID: ${id}`);
    }

    deleteStudent(id) {
        if (confirm('Apakah Anda yakin ingin menghapus mahasiswa ini?')) {
            console.log('Delete student:', id);
            alert(`Mahasiswa dengan ID ${id} telah dihapus`);
        }
    }

    editCourse(id) {
        console.log('Edit course:', id);
        alert(`Edit mata kuliah dengan ID: ${id}`);
    }

    viewCourse(id) {
        console.log('View course:', id);
        alert(`Lihat mata kuliah dengan ID: ${id}`);
    }

    configureAgent(id) {
        console.log('Configure agent:', id);
        alert(`Konfigurasi AI Agent dengan ID: ${id}`);
    }

    viewAgentLogs(id) {
        console.log('View agent logs:', id);
        alert(`Lihat log AI Agent dengan ID: ${id}`);
    }

    viewSubmissions(id) {
        console.log('View submissions:', id);
        alert(`Lihat submission tugas dengan ID: ${id}`);
    }

    editAssignment(id) {
        console.log('Edit assignment:', id);
        alert(`Edit tugas dengan ID: ${id}`);
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new DashboardManager();
});

// Export for module usage
export default DashboardManager;

/**
 * 三江源动物性格测试 - JavaScript 逻辑 (MBTI 16型)
 * 基于 MBTI 四维度：E/I、S/N、T/F、J/P → 16种动物人格
 */

// ========================================
// 触摸优化 - 触觉反馈 - 性能优化
// ========================================

function triggerHapticFeedback(type = 'light') {
    if (!navigator.vibrate) return;

    const patterns = {
        light: 10,
        medium: 20,
        heavy: 30,
        success: [10, 30, 10],
        error: [50, 30, 50]
    };

    const pattern = patterns[type] || patterns.light;
    navigator.vibrate(pattern);
}

function setTouchState(element, isTouching) {
    if (!element) return;

    if (isTouching) {
        element.classList.add('touching');
    } else {
        element.classList.remove('touching');
    }
}

// 性能优化：使用事件委托替代多个单独监听器
function addTouchListeners(selector) {
    document.querySelectorAll(selector).forEach(element => {
        element.addEventListener('touchstart', (e) => {
            setTouchState(e.currentTarget, true);
            triggerHapticFeedback('light');
        }, { passive: true });

        element.addEventListener('touchend', (e) => {
            setTouchState(e.currentTarget, false);
        }, { passive: true });

        element.addEventListener('touchcancel', (e) => {
            setTouchState(e.currentTarget, false);
        }, { passive: true });

        element.addEventListener('mousedown', (e) => {
            setTouchState(e.currentTarget, true);
        });

        element.addEventListener('mouseup', (e) => {
            setTouchState(e.currentTarget, false);
        });

        element.addEventListener('mouseleave', (e) => {
            setTouchState(e.currentTarget, false);
        });
    });
}

// 性能优化：事件委托用于选项点击（单个监听器替代多个）
function setupOptionDelegation() {
    optionsContainer.addEventListener('click', (e) => {
        const optionEl = e.target.closest('.option');
        if (optionEl && optionsContainer.contains(optionEl)) {
            const index = parseInt(optionEl.dataset.index);
            if (!isNaN(index)) {
                selectOption(index);
            }
        }
    });

    // 性能优化：事件委托用于触摸状态
    optionsContainer.addEventListener('touchstart', (e) => {
        const optionEl = e.target.closest('.option');
        if (optionEl && optionsContainer.contains(optionEl)) {
            setTouchState(optionEl, true);
            triggerHapticFeedback('light');
        }
    }, { passive: true });

    optionsContainer.addEventListener('touchend', (e) => {
        const optionEl = e.target.closest('.option');
        if (optionEl && optionsContainer.contains(optionEl)) {
            setTouchState(optionEl, false);
        }
    }, { passive: true });

    optionsContainer.addEventListener('touchcancel', (e) => {
        const optionEl = e.target.closest('.option');
        if (optionEl && optionsContainer.contains(optionEl)) {
            setTouchState(optionEl, false);
        }
    }, { passive: true });
}

// ========================================
// 全局变量
// ========================================

let currentQuestion = 0;
let answers = []; // 存储每道题的选项索引
let results = {}; // MBTI 四维度得分

// DOM 元素缓存
let optionsContainer, progressBar, progressText, prevBtn, nextBtn, questionText, questionCard;

// ========================================
// 初始化
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // 缓存 DOM 元素
    optionsContainer = document.getElementById('options');
    progressBar = document.getElementById('progress');
    progressText = document.getElementById('progressText');
    prevBtn = document.getElementById('prevBtn');
    nextBtn = document.getElementById('nextBtn');
    questionText = document.getElementById('questionText');
    questionCard = document.getElementById('questionCard');

    showPage('home');

    // 性能优化：设置懒加载
    setupLazyLoading();

    // 性能优化：设置事件委托用于选项
    setupOptionDelegation();

    addTouchListeners('.btn-primary');
    addTouchListeners('.btn-secondary');

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
});

// ========================================
// 页面导航
// ========================================

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function startTest() {
    currentQuestion = 0;
    answers = new Array(questions.length).fill(-1);
    results = {};
    showPage('test');
    renderQuestion();
    triggerHapticFeedback('success');
}

function restartTest() {
    startTest();
}

// ========================================
// 题目渲染
// ========================================

function renderQuestion() {
    const q = questions[currentQuestion];

    // 性能优化：使用 requestAnimationFrame 批量更新 DOM
    requestAnimationFrame(() => {
        questionText.textContent = q.text;

        // 性能优化：使用 DocumentFragment 批量添加选项
        const fragment = document.createDocumentFragment();

        q.options.forEach((option, index) => {
            const optionEl = document.createElement('div');
            optionEl.className = 'option';
            if (answers[currentQuestion] === index) {
                optionEl.classList.add('selected');
            }
            optionEl.dataset.index = index;

            optionEl.innerHTML = `
                <span class="option-text">${option.text}</span>
                <span class="option-score">${option.score > 0 ? '+' : ''}${option.score}</span>
            `;

            fragment.appendChild(optionEl);
        });

        optionsContainer.innerHTML = '';
        optionsContainer.appendChild(fragment);

        // 更新进度
        const progressPercent = ((currentQuestion + 1) / questions.length) * 100;
        progressBar.style.width = `${progressPercent}%`;
        progressText.textContent = `第 ${currentQuestion + 1} 题 / 共 ${questions.length} 题`;

        // 更新按钮状态
        prevBtn.disabled = currentQuestion === 0;
        nextBtn.disabled = answers[currentQuestion] === -1;

        // 如果是最后一题且已作答，按钮文字改为"查看结果"
        if (currentQuestion === questions.length - 1 && answers[currentQuestion] !== -1) {
            nextBtn.textContent = '查看结果 →';
        } else {
            nextBtn.textContent = '下一题 →';
        }

        // 动画效果
        questionCard.classList.remove('fade-in');
        void questionCard.offsetWidth; // 触发重排
        questionCard.classList.add('fade-in');
    });
}

// ========================================
// 选项选择与导航
// ========================================

function selectOption(index) {
    answers[currentQuestion] = index;

    // 更新选项样式
    optionsContainer.querySelectorAll('.option').forEach((opt, i) => {
        opt.classList.toggle('selected', i === index);
    });

    // 启用下一题按钮
    nextBtn.disabled = false;

    // 如果当前是最后一题，更新按钮文字
    if (currentQuestion === questions.length - 1) {
        nextBtn.textContent = '查看结果 →';
    }

    triggerHapticFeedback('light');
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestion();
    } else if (currentQuestion === questions.length - 1 && answers[currentQuestion] !== -1) {
        // 最后一题已作答，计算结果
        calculateResults();
        showResult();
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
    }
}

// ========================================
// MBTI 结果计算函数
// ========================================

function calculateResults() {
    // 初始化四维度得分
    const dimensions = {
        EI: { E: 0, I: 0, count: 0 },  // 外向(E) vs 内向(I)
        SN: { S: 0, N: 0, count: 0 },  // 感觉(S) vs 直觉(N)
        TF: { T: 0, F: 0, count: 0 },  // 思考(T) vs 情感(F)
        JP: { J: 0, P: 0, count: 0 }   // 判断(J) vs 感知(P)
    };

    // 计算每维度得分
    for (let i = 0; i < answers.length; i++) {
        const question = questions[i];
        const dimension = question.dimension; // 'EI', 'SN', 'TF', 'JP'
        const score = question.options[answers[i]].score;

        dimensions[dimension].count++;

        if (score > 0) {
            // 正向得分：E/S/T/J
            switch (dimension) {
                case 'EI': dimensions.EI.E += score; break;
                case 'SN': dimensions.SN.S += score; break;
                case 'TF': dimensions.TF.T += score; break;
                case 'JP': dimensions.JP.J += score; break;
            }
        } else {
            // 负向得分：I/N/F/P
            switch (dimension) {
                case 'EI': dimensions.EI.I += Math.abs(score); break;
                case 'SN': dimensions.SN.N += Math.abs(score); break;
                case 'TF': dimensions.TF.F += Math.abs(score); break;
                case 'JP': dimensions.JP.P += Math.abs(score); break;
            }
        }
    }

    // 确定 MBTI 类型（每个维度选得分高的）
    const mbtiType = [
        dimensions.EI.E >= dimensions.EI.I ? 'E' : 'I',
        dimensions.SN.S >= dimensions.SN.N ? 'S' : 'N',
        dimensions.TF.T >= dimensions.TF.F ? 'T' : 'F',
        dimensions.JP.J >= dimensions.JP.P ? 'J' : 'P'
    ].join('');

    // 存储结果
    results = {
        mbti: mbtiType,
        dimensions: dimensions,
        EI: dimensions.EI,
        SN: dimensions.SN,
        TF: dimensions.TF,
        JP: dimensions.JP
    };
}

// ========================================
// 结果展示函数
// ========================================

function determineAnimal() {
    const mbti = results.mbti;

    // MBTI 16种类型映射到动物
    const mbtiToAnimal = {
        'INTJ': 'snowLeopard',
        'INFP': 'tibetanAntelope',
        'ISTJ': 'yak',
        'ESFJ': 'kiang',
        'ISFP': 'whiteLippedDeer',
        'ISTP': 'muskDeer',
        'INFJ': 'blackNeckedCrane',
        'ESTJ': 'marmot',
        'ENTP': 'greyJay',
        'INTP': 'lynx',
        'ENFJ': 'blueSheep',
        'ISFJ': 'bharal',
        'ENTJ': 'goldenEagle',
        'ENFP': 'barHeadedGoose',
        'ESFP': 'plateauHare',
        'ESTP': 'tibetanFox'
    };

    const animalKey = mbtiToAnimal[mbti] || 'snowLeopard';
    return animals[animalKey];
}

function showResult() {
    showPage('result');
    const animal = determineAnimal();

    // 性能优化：使用 requestAnimationFrame 批量更新 DOM
    requestAnimationFrame(() => {
        // 更新动物信息
        const avatarEl = document.getElementById('animalAvatar');
        avatarEl.textContent = animal.emoji;
        avatarEl.className = `animal-avatar ${animal.colorClass}`;

        document.getElementById('animalName').textContent = animal.name;
        document.getElementById('animalTagline').textContent = animal.tagline;
        document.getElementById('resultDescription').textContent = animal.description;
        document.getElementById('animalBackground').textContent = animal.background;
        document.getElementById('matchText').textContent = `最佳伙伴：${animal.match}`;
        document.getElementById('tipsText').textContent = animal.tips;

        // 更新图片
        const imgEl = document.getElementById('animalImage');
        if (imgEl && animal.image) {
            imgEl.src = animal.image;
            imgEl.alt = animal.name;
            imgEl.style.display = 'block';
        }

        // 性能优化：使用 DocumentFragment 批量添加特质标签
        const traitsContainer = document.getElementById('traits');
        const fragment = document.createDocumentFragment();

        animal.traits.forEach(trait => {
            const traitEl = document.createElement('span');
            traitEl.className = 'trait-tag';
            traitEl.textContent = trait;
            fragment.appendChild(traitEl);
        });

        traitsContainer.innerHTML = '';
        traitsContainer.appendChild(fragment);

        // 绘制 MBTI 雷达图
        drawMBTIRadarChart();
    });

    triggerHapticFeedback('success');
}

// ========================================
// MBTI 雷达图绘制
// ========================================

let cachedCanvasSetup = null;

function setupCanvas(canvas) {
    const container = canvas.parentElement;
    const containerWidth = container.clientWidth;

    const displaySize = Math.min(containerWidth, 400);

    const dpr = window.devicePixelRatio || 1;

    canvas.width = displaySize * dpr;
    canvas.height = displaySize * dpr;

    canvas.style.width = `${displaySize}px`;
    canvas.style.height = `${displaySize}px`;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const centerX = displaySize / 2;
    const centerY = displaySize / 2;
    const padding = displaySize * 0.15;
    const radius = (displaySize / 2) - padding;

    return { ctx, canvas, centerX, centerY, radius, displaySize, dpr };
}

function drawMBTIRadarChart() {
    const canvas = document.getElementById('radarChart');
    if (!canvas) return;

    requestAnimationFrame(() => {
        const { ctx, centerX, centerY, radius } = setupCanvas(canvas);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 绘制网格和轴线（4个维度）
        drawMBTIGrid(ctx, centerX, centerY, radius);

        // 计算数据（将 MBTI 各维度转化为雷达图数据）
        const data = calculateMBTIRadarData();
        drawMBTIData(ctx, centerX, centerY, radius, data);
    });
}

function calculateMBTIRadarData() {
    const { EI, SN, TF, JP } = results;

    // 每个维度计算正向外向得分比例（0-1）
    const eiScore = EI.E / (EI.E + EI.I) || 0.5;  // E倾向
    const snScore = SN.S / (SN.S + SN.N) || 0.5;  // S倾向
    const tfScore = TF.T / (TF.T + TF.F) || 0.5;  // T倾向
    const jpScore = JP.J / (JP.J + JP.P) || 0.5;  // J倾向

    return [eiScore, snScore, tfScore, jpScore];
}

function drawMBTIGrid(ctx, centerX, centerY, radius) {
    const sides = 4; // MBTI 四维度
    const angleStep = (Math.PI * 2) / sides;

    const gridLineWidth = Math.max(1, radius * 0.01);
    const axisLineWidth = Math.max(1, radius * 0.015);

    // 绘制网格线
    ctx.beginPath();
    ctx.strokeStyle = '#e8dcc4';
    ctx.lineWidth = gridLineWidth;

    for (let i = 1; i <= 5; i++) {
        for (let j = 0; j <= sides; j++) {
            const angle = j * angleStep - Math.PI / 2;
            const r = (radius * i) / 5;
            const x = centerX + Math.cos(angle) * r;
            const y = centerY + Math.sin(angle) * r;

            if (j === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
    }
    ctx.stroke();

    // 绘制轴线
    ctx.beginPath();
    ctx.strokeStyle = '#c4a574';
    ctx.lineWidth = axisLineWidth;

    for (let i = 0; i < sides; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
    }
    ctx.stroke();

    // 绘制标签
    ctx.fillStyle = '#5a3e28';
    ctx.font = `${Math.max(12, radius * 0.08)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const labels = ['外向性(E)', '感觉性(S)', '思考性(T)', '判断性(J)'];
    for (let i = 0; i < sides; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + Math.cos(angle) * (radius + 20);
        const y = centerY + Math.sin(angle) * (radius + 20);
        ctx.fillText(labels[i], x, y);
    }
}

function drawMBTIData(ctx, centerX, centerY, radius, data) {
    const sides = 4;
    const angleStep = (Math.PI * 2) / sides;

    const dataLineWidth = Math.max(2, radius * 0.03);
    const pointRadius = Math.max(4, radius * 0.05);

    // 绘制数据区域
    ctx.beginPath();
    ctx.fillStyle = 'rgba(45, 90, 135, 0.3)';
    ctx.strokeStyle = 'rgba(45, 90, 135, 0.8)';
    ctx.lineWidth = dataLineWidth;

    for (let i = 0; i < sides; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const value = data[i];
        const r = radius * value;
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // 绘制数据点
    ctx.fillStyle = '#2d5a87';
    for (let i = 0; i < sides; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const value = data[i];
        const r = radius * value;
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;

        ctx.beginPath();
        ctx.arc(x, y, pointRadius, 0, Math.PI * 2);
        ctx.fill();
    }
}

// ========================================
// 分享功能
// ========================================

function shareResult() {
    const animal = determineAnimal();
    const shareText = `我是${animal.name}（${animal.mbti}）！我的高原图腾是「${animal.tagline}」。来测试你的动物性格吧！`;
    triggerHapticFeedback('success');

    if (navigator.share) {
        navigator.share({
            title: '三江源动物性格测试',
            text: shareText,
            url: window.location.href
        }).catch(console.error);
    } else {
        navigator.clipboard.writeText(shareText + ' ' + window.location.href)
            .then(() => {
                alert('结果已复制到剪贴板！');
            })
            .catch(() => {
                alert('无法复制，请手动复制结果。');
            });
    }
}

// ========================================
// 性能优化：懒加载
// ========================================

let resizeTimeout;

function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const resultPage = document.getElementById('result');
        if (resultPage && resultPage.classList.contains('active')) {
            drawMBTIRadarChart();
        }
    }, 250);
}

function setupLazyLoading() {
    const homePage = document.getElementById('home');
    if (homePage) {
        homePage.setAttribute('data-loaded', 'true');
    }

    if ('IntersectionObserver' in window) {
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.setAttribute('data-loaded', 'true');
                    lazyObserver.unobserve(element);
                }
            });
        }, {
            rootMargin: '50px'
        });

        document.querySelectorAll('[data-lazy="true"]').forEach(element => {
            lazyObserver.observe(element);
        });
    } else {
        document.querySelectorAll('[data-lazy="true"]').forEach(element => {
            element.setAttribute('data-loaded', 'true');
        });
    }
}

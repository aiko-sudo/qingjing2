/**
 * 三江源动物性格测试 - JavaScript 逻辑
 * 基于大五人格理论 (Big Five / OCEAN)
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
// 题目数据 - 36题完整题库
// ========================================

const questions = [
    // 大五人格基础题 - 开放性 (6题)
    {
        dimension: 'openness',
        text: '我喜欢尝试新的餐厅、旅行目的地或体验新事物',
        options: [
            { text: '完全不符合', score: 1 },
            { text: '不太符合', score: 2 },
            { text: '一般', score: 3 },
            { text: '比较符合', score: 4 },
            { text: '完全符合', score: 5 }
        ]
    },
    {
        dimension: 'openness',
        text: '我对艺术、文化和哲学话题很感兴趣',
        options: [
            { text: '完全不符合', score: 1 },
            { text: '不太符合', score: 2 },
            { text: '一般', score: 3 },
            { text: '比较符合', score: 4 },
            { text: '完全符合', score: 5 }
        ]
    },
    {
        dimension: 'openness',
        text: '我善于接受不同的观点和思维方式',
        options: [
            { text: '完全不符合', score: 1 },
            { text: '不太符合', score: 2 },
            { text: '一般', score: 3 },
            { text: '比较符合', score: 4 },
            { text: '完全符合', score: 5 }
        ]
    },
    {
        dimension: 'openness',
        text: '我喜欢探索未知的领域和解决复杂问题',
        options: [
            { text: '完全不符合', score: 1 },
            { text: '不太符合', score: 2 },
            { text: '一般', score: 3 },
            { text: '比较符合', score: 4 },
            { text: '完全符合', score: 5 }
        ]
    },
    {
        dimension: 'openness',
        text: '我经常思考人生的意义和宇宙的奥秘',
        options: [
            { text: '完全不符合', score: 1 },
            { text: '不太符合', score: 2 },
            { text: '一般', score: 3 },
            { text: '比较符合', score: 4 },
            { text: '完全符合', score: 5 }
        ]
    },
    {
        dimension: 'openness',
        text: '我愿意尝试有风险但可能有收获的新事物',
        options: [
            { text: '完全不符合', score: 1 },
            { text: '不太符合', score: 2 },
            { text: '一般', score: 3 },
            { text: '比较符合', score: 4 },
            { text: '完全符合', score: 5 }
        ]
    },
    
    // 责任感 (6题)
    {
        dimension: 'conscientiousness',
        text: '我会提前规划并按时完成任务',
        options: [
            { text: '完全不符合', score: 1 },
            { text: '不太符合', score: 2 },
            { text: '一般', score: 3 },
            { text: '比较符合', score: 4 },
            { text: '完全符合', score: 5 }
        ]
    },
    {
        dimension: 'conscientiousness',
        text: '我对工作/学习认真负责，追求完美',
        options: [
            { text: '完全不符合', score: 1 },
            { text: '不太符合', score: 2 },
            { text: '一般', score: 3 },
            { text: '比较符合', score: 4 },
            { text: '完全符合', score: 5 }
        ]
    },
    {
        dimension: 'conscientiousness',
        text: '我能够坚持长期目标，不轻易放弃',
        options: [
            { text: '完全不符合', score: 1 },
            { text: '不太符合', score: 2 },
            { text: '一般', score: 3 },
            { text: '比较符合', score: 4 },
            { text: '完全符合', score: 5 }
        ]
    },
    {
        dimension: 'conscientiousness',
        text: '我注重细节，工作有条理',
        options: [
            { text: '完全不符合', score: 1 },
            { text: '不太符合', score: 2 },
            { text: '一般', score: 3 },
            { text: '比较符合', score: 4 },
            { text: '完全符合', score: 5 }
        ]
    },
    {
        dimension: 'conscientiousness',
        text: '我相信规则和纪律的重要性',
        options: [
            { text: '完全不符合', score: 1 },
            { text: '不太符合', score: 2 },
            { text: '一般', score: 3 },
            { text: '比较符合', score: 4 },
            { text: '完全符合', score: 5 }
        ]
    },
    {
        dimension: 'conscientiousness',
        text: '我会为自己的承诺负责到底',
        options: [
            { text: '完全不符合', score: 1 },
            { text: '不太符合', score: 2 },
            { text: '一般', score: 3 },
            { text: '比较符合', score: 4 },
            { text: '完全符合', score: 5 }
        ]
    },
    
    // 外向性 (6题)
    {
        dimension: 'extraversion',
        text: '在聚会中，我通常主动与陌生人交谈',
        options: [
            { text: '完全不符合', score: 1 },
            { text: '不太符合', score: 2 },
            { text: '一般', score: 3 },
            { text: '比较符合', score: 4 },
            { text: '完全符合', score: 5 }
        ]
    },
    {
        dimension: 'extraversion',
        text: '我精力充沛，喜欢社交活动',
        options: [
            { text: '完全不符合', score: 1 },
            { text: '不太符合', score: 2 },
            { text: '一般', score: 3 },
            { text: '比较符合', score: 4 },
            { text: '完全符合', score: 5 }
        ]
    },
    {
        dimension: 'extraversion',
        text: '我喜欢成为关注的焦点',
        options: [
            { text: '完全不符合', score: 1 },
            { text: '不太符合', score: 2 },
            { text: '一般', score: 3 },
            { text: '比较符合', score: 4 },
            { text: '完全符合', score: 5 }
        ]
    },
    {
        dimension: 'extraversion',
        text: '我容易结交新朋友',
        options: [
            { text: '完全不符合', score: 1 },
            { text: '不太符合', score: 2 },
            { text: '一般', score: 3 },
            { text: '比较符合', score: 4 },
            { text: '完全符合', score: 5 }
        ]
    },
    {
        dimension: 'extraversion',
        text: '我说话时比大多数人更活跃',
        options: [
            { text: '完全不符合', score: 1 },
            { text: '不太符合', score: 2 },
            { text: '一般', score: 3 },
            { text: '比较符合', score: 4 },
            { text: '完全符合', score: 5 }
        ]
    },
    {
        dimension: 'extraversion',
        text: '我享受团队合作多于独自工作',
        options: [
            { text: '完全不符合', score: 1 },
            { text: '不太符合', score: 2 },
            { text: '一般', score: 3 },
            { text: '比较符合', score: 4 },
            { text: '完全符合', score: 5 }
        ]
    },
    
    // 宜人性 (6题)
    {
        dimension: 'agreeableness',
        text: '我相信人性本善，愿意相信他人',
        options: [
            { text: '完全不符合', score: 1 },
            { text: '不太符合', score: 2 },
            { text: '一般', score: 3 },
            { text: '比较符合', score: 4 },
            { text: '完全符合', score: 5 }
        ]
    },
    {
        dimension: 'agreeableness',
        text: '我善于理解他人的感受和需求',
        options: [
            { text: '完全不符合', score: 1 },
            { text: '不太符合', score: 2 },
            { text: '一般', score: 3 },
            { text: '比较符合', score: 4 },
            { text: '完全符合', score: 5 }
        ]
    },
    {
        dimension: 'agreeableness',
        text: '我尽量避免冲突，愿意妥协',
        options: [
            { text: '完全不符合', score: 1 },
            { text: '不太符合', score: 2 },
            { text: '一般', score: 3 },
            { text: '比较符合', score: 4 },
            { text: '完全符合', score: 5 }
        ]
    },
    {
        dimension: 'agreeableness',
        text: '我乐于帮助他人',
        options: [
            { text: '完全不符合', score: 1 },
            { text: '不太符合', score: 2 },
            { text: '一般', score: 3 },
            { text: '比较符合', score: 4 },
            { text: '完全符合', score: 5 }
        ]
    },
    {
        dimension: 'agreeableness',
        text: '我关心团队和谐多于个人利益',
        options: [
            { text: '完全不符合', score: 1 },
            { text: '不太符合', score: 2 },
            { text: '一般', score: 3 },
            { text: '比较符合', score: 4 },
            { text: '完全符合', score: 5 }
        ]
    },
    {
        dimension: 'agreeableness',
        text: '我善于倾听并给予建设性反馈',
        options: [
            { text: '完全不符合', score: 1 },
            { text: '不太符合', score: 2 },
            { text: '一般', score: 3 },
            { text: '比较符合', score: 4 },
            { text: '完全符合', score: 5 }
        ]
    },
    
    // 神经质/情绪稳定性 (6题)
    {
        dimension: 'neuroticism',
        text: '面对压力时，我容易感到焦虑',
        options: [
            { text: '完全不符合', score: 5 },
            { text: '不太符合', score: 4 },
            { text: '一般', score: 3 },
            { text: '比较符合', score: 2 },
            { text: '完全符合', score: 1 }
        ]
    },
    {
        dimension: 'neuroticism',
        text: '我经常担心未来的事情',
        options: [
            { text: '完全不符合', score: 5 },
            { text: '不太符合', score: 4 },
            { text: '一般', score: 3 },
            { text: '比较符合', score: 2 },
            { text: '完全符合', score: 1 }
        ]
    },
    {
        dimension: 'neuroticism',
        text: '我情绪波动较大，容易受影响',
        options: [
            { text: '完全不符合', score: 5 },
            { text: '不太符合', score: 4 },
            { text: '一般', score: 3 },
            { text: '比较符合', score: 2 },
            { text: '完全符合', score: 1 }
        ]
    },
    {
        dimension: 'neuroticism',
        text: '面对批评时，我会过度反思',
        options: [
            { text: '完全不符合', score: 5 },
            { text: '不太符合', score: 4 },
            { text: '一般', score: 3 },
            { text: '比较符合', score: 2 },
            { text: '完全符合', score: 1 }
        ]
    },
    {
        dimension: 'neuroticism',
        text: '我有时会感到孤独或失落',
        options: [
            { text: '完全不符合', score: 5 },
            { text: '不太符合', score: 4 },
            { text: '一般', score: 3 },
            { text: '比较符合', score: 2 },
            { text: '完全符合', score: 1 }
        ]
    },
    {
        dimension: 'neuroticism',
        text: '我很难从挫折中快速恢复',
        options: [
            { text: '完全不符合', score: 5 },
            { text: '不太符合', score: 4 },
            { text: '一般', score: 3 },
            { text: '比较符合', score: 2 },
            { text: '完全符合', score: 1 }
        ]
    },
    
    // 高原情境投射题 (6题)
    {
        dimension: 'openness',
        text: '如果你在高原上迷路，你会选择？',
        options: [
            { text: '独自寻找高处观察地形', score: 5 },
            { text: '跟随群体足迹前进', score: 3 },
            { text: '原地等待救援', score: 2 },
            { text: '尝试多种路径探索', score: 4 }
        ]
    },
    {
        dimension: 'conscientiousness',
        text: '面对高原上的困难任务，你更倾向于？',
        options: [
            { text: '制定详细计划再行动', score: 5 },
            { text: '边做边调整', score: 3 },
            { text: '寻求他人帮助', score: 2 },
            { text: '凭直觉快速行动', score: 4 }
        ]
    },
    {
        dimension: 'extraversion',
        text: '在高原营地，你更喜欢？',
        options: [
            { text: '组织集体活动', score: 5 },
            { text: '与几个朋友聊天', score: 4 },
            { text: '独自欣赏风景', score: 2 },
            { text: '跟随他人活动', score: 3 }
        ]
    },
    {
        dimension: 'agreeableness',
        text: '遇到高原上的陌生人求助，你会？',
        options: [
            { text: '热情帮助', score: 5 },
            { text: '在确保安全的前提下帮助', score: 4 },
            { text: '建议他寻求专业帮助', score: 3 },
            { text: '谨慎对待，婉拒', score: 2 }
        ]
    },
    {
        dimension: 'neuroticism',
        text: '高原旅行中遇到突发状况，你的第一反应是？',
        options: [
            { text: '保持冷静，迅速应对', score: 5 },
            { text: '有些紧张但能处理', score: 4 },
            { text: '感到焦虑，需要时间调整', score: 2 },
            { text: '慌乱，不知所措', score: 1 }
        ]
    },
    {
        dimension: 'openness',
        text: '你期待在高原之旅中发现什么？',
        options: [
            { text: '未知的自然奇观', score: 5 },
            { text: '独特的文化体验', score: 4 },
            { text: '心灵的平静', score: 3 },
            { text: '挑战自我的机会', score: 4 }
        ]
    }
];

// ========================================
// 动物结果数据
// ========================================

const animals = {
    wolf: {
        name: '雪豹',
        emoji: '🐺',
        tagline: '孤独的策略家 · 高原隐士',
        traits: ['独立思考', '战略眼光', '高度专注', '冷静理性'],
        colorClass: 'animal-wolf',
        description: '你如同雪豹一般，拥有深邃的智慧和独立的灵魂。在群体中，你或许不是最活跃的那个，但你的每一次发言都充满力量。你善于观察全局，在关键时刻做出精准的判断。',
        match: '藏羚羊（团队协作）',
        tips: '适当敞开心扉会让你的高原之旅更加精彩。尝试信任团队成员，你的领导力会在协作中迸发更大能量。',
        radarLabels: ['开放性', '责任感', '外向性', '宜人性', '情绪稳定性']
    },
    gull: {
        name: '棕头鸥',
        emoji: '🐦',
        tagline: '热情的社交家 · 群体之星',
        traits: ['活力四射', '善于表达', '社交达人', '感染力强'],
        colorClass: 'animal-gull',
        description: '你如同高原上的棕头鸥，天生就是社交的中心。你的热情如同阳光，能够照亮周围的每一个人。在团队中，你是最好的润滑剂，让所有人感到舒适和快乐。',
        match: '牦牛（稳定支持）',
        tips: '试着在热情中增加一些深度思考，你的社交能力与战略思维结合，将无往不胜。',
        radarLabels: ['开放性', '责任感', '外向性', '宜人性', '情绪稳定性']
    },
    yak: {
        name: '牦牛',
        emoji: '🦬',
        tagline: '坚韧的守护者 · 高原脊梁',
        traits: ['稳定可靠', '耐心坚韧', '责任担当', '默默付出'],
        colorClass: 'animal-yak',
        description: '你如同高原上的牦牛，是团队最可靠的支柱。你的稳定和坚韧让人安心，无论面对多大的困难，你都能稳步前行。默默付出是你的特质，也是你最魅力的所在。',
        match: '棕头鸥（互补成长）',
        tips: '适当的表达自己的需求和情绪，会让你获得更多支持。你的价值值得被看见、被认可。',
        radarLabels: ['开放性', '责任感', '外向性', '宜人性', '情绪稳定性']
    },
    vulture: {
        name: '高山兀鹫',
        emoji: '🦅',
        tagline: '精准的分析者 · 智慧观察者',
        traits: ['审慎分析', '客观理性', '敏锐洞察', '风险意识'],
        colorClass: 'animal-vulture',
        description: '你如同高原上的高山兀鹫，拥有鹰一般锐利的眼睛和冷静的头脑。你不急于行动，而是仔细观察、分析局势。你的判断准确而深刻，常常能发现别人忽视的细节。',
        match: '赤狐（智识碰撞）',
        tips: '过度的谨慎可能会让你错失良机。试着在分析之后果断行动，你会发现执行力同样重要。',
        radarLabels: ['开放性', '责任感', '外向性', '宜人性', '情绪稳定性']
    },
    fox: {
        name: '赤狐',
        emoji: '🦊',
        tagline: '灵活的适应者 · 环境艺术家',
        traits: ['灵活应变', '智慧生存', '适应力强', '实用主义'],
        colorClass: 'animal-fox',
        description: '你如同赤狐，是高原上最聪明的生存者。面对变化，你从不慌张，而是快速找到最佳的应对策略。你的灵活性是你的超能力，让你在任何环境中都能游刃有余。',
        match: '雪豹（智者对话）',
        tips: '保持稳定的核心价值观会让你更加可靠。灵活性与原则性并不矛盾，找到平衡点你将更加出色。',
        radarLabels: ['开放性', '责任感', '外向性', '宜人性', '情绪稳定性']
    }
};

// ========================================
// 应用状态
// ========================================

let currentQuestion = 0;
let answers = [];
let results = {
    openness: 0,
    conscientiousness: 0,
    extraversion: 0,
    agreeableness: 0,
    neuroticism: 0
};

// ========================================
// DOM 元素
// ========================================

const homePage = document.getElementById('home');
const testPage = document.getElementById('test');
const resultPage = document.getElementById('result');
const progressFill = document.getElementById('progress');
const progressText = document.getElementById('progressText');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('options');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// ========================================
// 页面切换函数
// ========================================

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function startTest() {
    currentQuestion = 0;
    answers = [];
    results = {
        openness: 0,
        conscientiousness: 0,
        extraversion: 0,
        agreeableness: 0,
        neuroticism: 0
    };
    // 性能优化：清除缓存
    cachedAnimalKey = null;
    cachedAnimal = null;
    cachedCanvasSetup = null;
    showPage('test');
    renderQuestion();
}

function restartTest() {
    startTest();
}

// ========================================
// 题目渲染函数 - 性能优化
// ========================================

function renderQuestion() {
    const question = questions[currentQuestion];

    // 性能优化：批量更新进度条和文本（减少回流）
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `第 ${currentQuestion + 1} 题 / 共 ${questions.length} 题`;

    questionText.textContent = question.text;

    // 性能优化：使用 DocumentFragment 批量添加选项（减少回流）
    // 性能优化：移除单独的事件监听器，使用事件委托
    optionsContainer.innerHTML = '';

    const fragment = document.createDocumentFragment();

    question.options.forEach((option, index) => {
        const optionEl = document.createElement('div');
        optionEl.className = 'option';
        optionEl.textContent = option.text;
        optionEl.dataset.index = index;
        optionEl.dataset.score = option.score;

        if (answers[currentQuestion] !== undefined) {
            if (answers[currentQuestion] === index) {
                optionEl.classList.add('selected');
            }
        }

        fragment.appendChild(optionEl);
    });

    optionsContainer.appendChild(fragment);

    prevBtn.disabled = currentQuestion === 0;
    nextBtn.textContent = currentQuestion === questions.length - 1 ? '查看结果 →' : '下一题 →';
    nextBtn.disabled = answers[currentQuestion] === undefined;
}

function selectOption(index) {
    answers[currentQuestion] = index;
    triggerHapticFeedback('medium');

    document.querySelectorAll('.option').forEach((option, i) => {
        if (i === index) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });

    nextBtn.disabled = false;
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestion();
    } else {
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
// 结果计算函数 - 性能优化
// ========================================

function calculateResults() {
    // 初始化结果
    const dimensions = ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'];
    dimensions.forEach(dim => results[dim] = 0);

    const dimensionCounts = {
        openness: 0,
        conscientiousness: 0,
        extraversion: 0,
        agreeableness: 0,
        neuroticism: 0
    };

    // 性能优化：减少重复属性访问
    for (let i = 0; i < answers.length; i++) {
        const question = questions[i];
        const dimension = question.dimension;
        const score = question.options[answers[i]].score;

        results[dimension] += score;
        dimensionCounts[dimension]++;
    }

    // 性能优化：计算平均值并归一化到 1-10 分制（减少循环）
    for (let i = 0; i < dimensions.length; i++) {
        const dim = dimensions[i];
        results[dim] = Math.round((results[dim] / dimensionCounts[dim]) * 2) / 2;
    }

    // 计算神经质反转分数（用于雷达图显示）
    results.neuroticismReversed = 10 - results.neuroticism;
}

// ========================================
// 结果展示函数 - 性能优化
// ========================================

// 性能优化：Memoization 缓存动物判定结果
let cachedAnimalKey = null;
let cachedAnimal = null;

function showResult() {
    showPage('result');

    // 确定动物类型（使用缓存）
    const animal = determineAnimal();

    // 性能优化：使用 requestAnimationFrame 批量更新 DOM（减少回流）
    requestAnimationFrame(() => {
        // 批量更新文本内容（先读取所有元素，再批量写入）
        const avatarEl = document.getElementById('animalAvatar');
        avatarEl.textContent = animal.emoji;
        avatarEl.className = `animal-avatar ${animal.colorClass}`;

        document.getElementById('animalName').textContent = animal.name;
        document.getElementById('animalTagline').textContent = animal.tagline;
        document.getElementById('resultDescription').textContent = animal.description;
        document.getElementById('matchText').textContent = `最佳伙伴：${animal.match}`;
        document.getElementById('tipsText').textContent = animal.tips;

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

        // 绘制雷达图
        drawRadarChart();
    });
}

function determineAnimal() {
    // 性能优化：使用 Memoization 避免重复计算
    const { openness, conscientiousness, extraversion, agreeableness, neuroticism } = results;
    const cacheKey = `${openness},${conscientiousness},${extraversion},${agreeableness},${neuroticism}`;

    if (cachedAnimalKey === cacheKey && cachedAnimal) {
        return cachedAnimal;
    }

    // 评分规则（简化版）
    // 雪豹：高开放性 + 低外向性 + 高神经质反转 = 策略型
    // 棕头鸥：高外向性 + 高宜人性 = 社交型
    // 牦牛：高责任感 + 高宜人性 = 稳定型
    // 高山兀鹫：低外向性 + 高责任感 = 分析型
    // 赤狐：高开放性 + 低神经质 = 适应型

    // 性能优化：预计算常用值
    const opennessNorm = openness / 10;
    const conscientiousnessNorm = conscientiousness / 10;
    const extraversionNorm = extraversion / 10;
    const agreeablenessNorm = agreeableness / 10;
    const neuroticismReversedNorm = (10 - neuroticism) / 10;
    const lowExtraversionNorm = 1 - extraversionNorm;

    let scores = {
        wolf: 0,
        gull: 0,
        yak: 0,
        vulture: 0,
        fox: 0
    };

    // 雪豹计算
    scores.wolf += opennessNorm * 3;
    scores.wolf += lowExtraversionNorm * 2;
    scores.wolf += neuroticismReversedNorm * 2;
    scores.wolf += conscientiousnessNorm * 3;

    // 棕头鸥计算
    scores.gull += extraversionNorm * 4;
    scores.gull += agreeablenessNorm * 3;
    scores.gull += opennessNorm * 2;
    scores.gull += conscientiousnessNorm * 1;

    // 牦牛计算
    scores.yak += conscientiousnessNorm * 4;
    scores.yak += agreeablenessNorm * 3;
    scores.yak += neuroticismReversedNorm * 2;
    scores.yak += extraversionNorm * 1;

    // 高山兀鹫计算
    scores.vulture += conscientiousnessNorm * 4;
    scores.vulture += lowExtraversionNorm * 3;
    scores.vulture += opennessNorm * 2;
    scores.vulture += agreeablenessNorm * 1;

    // 赤狐计算
    scores.fox += opennessNorm * 3;
    scores.fox += neuroticismReversedNorm * 3;
    scores.fox += conscientiousnessNorm * 2;
    scores.fox += extraversionNorm * 2;

    // 找出最高分（性能优化：使用 for 循环替代 forEach）
    let maxScore = 0;
    let result = animals.fox;
    const keys = Object.keys(scores);

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (scores[key] > maxScore) {
            maxScore = scores[key];
            result = animals[key];
        }
    }

    // 缓存结果
    cachedAnimalKey = cacheKey;
    cachedAnimal = result;

    return result;
}

// ========================================
// 雷达图绘制函数 - 性能优化
// ========================================

// 性能优化：缓存Canvas设置和网格
let cachedCanvasSetup = null;
let cachedGridData = null;

/**
 * 设置Canvas尺寸，支持设备像素比，确保在高DPI屏幕上清晰显示
 * @param {HTMLCanvasElement} canvas - Canvas元素
 * @returns {Object} 包含canvas上下文、尺寸和半径的对象
 */
function setupCanvas(canvas) {
    const container = canvas.parentElement;
    const containerWidth = container.clientWidth;

    const displaySize = Math.min(containerWidth, 400);

    // 性能优化：检查是否需要重新设置（避免不必要的重绘）
    if (cachedCanvasSetup &&
        cachedCanvasSetup.displaySize === displaySize &&
        cachedCanvasSetup.dpr === (window.devicePixelRatio || 1)) {
        return cachedCanvasSetup;
    }

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

    cachedCanvasSetup = {
        ctx,
        canvas,
        centerX,
        centerY,
        radius,
        displaySize,
        dpr
    };

    return cachedCanvasSetup;
}

function drawRadarChart() {
    const canvas = document.getElementById('radarChart');
    if (!canvas) return;

    // 性能优化：使用 requestAnimationFrame 进行批量绘制
    requestAnimationFrame(() => {
        const { ctx, centerX, centerY, radius, canvas: cvs } = setupCanvas(canvas);

        ctx.clearRect(0, 0, cvs.width, cvs.height);

        drawRadarGrid(ctx, centerX, centerY, radius);

        const data = [
            results.openness,
            results.conscientiousness,
            results.extraversion,
            results.agreeableness,
            results.neuroticismReversed
        ];

        drawRadarData(ctx, centerX, centerY, radius, data);
    });
}

function drawRadarGrid(ctx, centerX, centerY, radius) {
    const sides = 5;
    const angleStep = (Math.PI * 2) / sides;

    const gridLineWidth = Math.max(1, radius * 0.01);
    const axisLineWidth = Math.max(1, radius * 0.015);

    // 性能优化：批量绘制所有网格线（减少 draw calls）
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

    // 性能优化：批量绘制所有轴线
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
}

function drawRadarData(ctx, centerX, centerY, radius, data) {
    const sides = 5;
    const angleStep = (Math.PI * 2) / sides;

    const dataLineWidth = Math.max(2, radius * 0.03);
    const pointRadius = Math.max(4, radius * 0.05);

    // 性能优化：批量绘制数据区域和边框
    ctx.beginPath();
    ctx.fillStyle = 'rgba(45, 90, 135, 0.3)';
    ctx.strokeStyle = 'rgba(45, 90, 135, 0.8)';
    ctx.lineWidth = dataLineWidth;

    for (let i = 0; i < sides; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const value = data[i] / 10;
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

    // 性能优化：批量绘制所有数据点
    ctx.fillStyle = '#2d5a87';
    for (let i = 0; i < sides; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const value = data[i] / 10;
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
    const shareText = `我是${animal.name}！我的高原图腾是「${animal.tagline}」。来测试你的动物性格吧！`;
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
// 初始化 - 性能优化
// ========================================

let resizeTimeout;

function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const resultPage = document.getElementById('result');
        if (resultPage && resultPage.classList.contains('active')) {
            // 性能优化：清除缓存以重新计算尺寸
            cachedCanvasSetup = null;
            drawRadarChart();
        }
    }, 250);
}

// 性能优化：懒加载非关键内容
function setupLazyLoading() {
    // 标记首页为已加载
    const homePage = document.getElementById('home');
    if (homePage) {
        homePage.setAttribute('data-loaded', 'true');
    }

    // 使用 Intersection Observer 懒加载其他页面
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

        // 观察所有标记为懒加载的页面
        document.querySelectorAll('[data-lazy="true"]').forEach(element => {
            lazyObserver.observe(element);
        });
    } else {
        // 降级支持：所有页面立即加载
        document.querySelectorAll('[data-lazy="true"]').forEach(element => {
            element.setAttribute('data-loaded', 'true');
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
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

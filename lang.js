const LANG_DICT = {
  // Navigation & Headers
  "SETTINGS": { es: "AJUSTES", fr: "PARAMÈTRES", ru: "НАСТРОЙКИ", zh: "设置", ja: "設定" },
  "SELECT LANGUAGE": { es: "SELECCIONAR IDIOMA", fr: "CHOISIR LA LANGUE", ru: "ВЫБЕРИТЕ ЯЗЫК", zh: "选择语言", ja: "言語を選択" },
  "EXECUTOR": { es: "EJECUTOR", fr: "EXÉCUTEUR", ru: "ИСПОЛНИТЕЛЬ", zh: "执行器", ja: "エグゼキューター" },
  "HEALTH": { es: "SALUD", fr: "SANTÉ", ru: "ЗДОРОВЬЕ", zh: "健康", ja: "健康" },
  "RESULTS": { es: "RESULTADOS", fr: "RÉSULTATS", ru: "РЕЗУЛЬТАТЫ", zh: "结果", ja: "結果" },
  "VIEW RESULTS ↓": { es: "VER RESULTADOS ↓", fr: "VOIR RÉSULTATS ↓", ru: "РЕЗУЛЬТАТЫ ↓", zh: "查看结果 ↓", ja: "結果を見る ↓" },
  "LEAVE A REVIEW?": { es: "¿DEJAR RESEÑA?", fr: "LAISSER UN AVIS?", ru: "ОСТАВИТЬ ОТЗЫВ?", zh: "留下评论？", ja: "レビューを残す？" },
  
  // About Section
  "ABOUT": { es: "ACERCA DE", fr: "À PROPOS", ru: "О НАС", zh: "关于", ja: "約" },
  "WHAT IS THIS": { es: "QUÉ ES ESTO", fr: "QU'EST-CE QUE C'EST", ru: "ЧТО ЭТО", zh: "这是什么", ja: "これは何ですか" },
  "HOW IT WORKS": { es: "CÓMO FUNCIONA", fr: "COMMENT ÇA MARCHE", ru: "КАК ЭТО РАБОТАЕТ", zh: "怎么运作", ja: "動作原理" },
  "THIS SITE": { es: "ESTE SITIO", fr: "CE SITE", ru: "ЭТОТ САЙТ", zh: "这个网站", ja: "このサイト" },
  
  // Stats
  "SECURE (≥80%)": { es: "SEGURO (≥80%)", fr: "SÉCURISÉ (≥80%)", ru: "БЕЗОПАСНО (≥80%)", zh: "安全 (≥80%)", ja: "安全 (≥80%)" },
  "VULNERABLE": { es: "VULNERABLE", fr: "VULNÉRABLE", ru: "УЯЗВИМЫЙ", zh: "脆弱的", ja: "脆弱な" },
  "AVG SECURITY": { es: "SEGURIDAD PROM", fr: "SÉCURITÉ MOY", ru: "СРЕДНЯЯ БЕЗОПАСНОСТЬ", zh: "平均安全", ja: "平均セキュリティ" },
  "EXECUTORS": { es: "EJECUTORES", fr: "EXÉCUTEURS", ru: "ИСПОЛНИТЕЛИ", zh: "执行器组", ja: "実行者" },
  "REPORTS LOADED": { es: "REPORTES CARGADOS", fr: "RAPPORTS CHARGÉS", ru: "ОТЧЕТЫ ЗАГРУЖЕНЫ", zh: "已加载报告", ja: "ロードされたレポート" },
  
  // Links
  "← BACK TO HOME": { es: "← VOLVER AL INICIO", fr: "← RETOUR À L'ACCUEIL", ru: "← НА ГЛАВНУЮ", zh: "← 返回主页", ja: "← ホームに戻る" },
  "< BACK TO RESULTS": { es: "< VOLVER A RESULTADOS", fr: "< RETOUR AUX RÉSULTATS", ru: "< НАЗАД К РЕЗУЛЬТАТАМ", zh: "< 返回结果", ja: "< 結果に戻る" },
  "OPEN": { es: "ABRIR", fr: "OUVRIR", ru: "ОТКРЫТЬ", zh: "打开", ja: "開く" },
  "CLOSE": { es: "CERRAR", fr: "FERMER", ru: "ЗАКРЫТЬ", zh: "关闭", ja: "閉じる" },
  
  // Report Pages
  "OVERVIEW": { es: "RESUMEN", fr: "APERÇU", ru: "ОБЗОР", zh: "概览", ja: "概要" },
  "SECURITY": { es: "SEGURIDAD", fr: "SÉCURITÉ", ru: "БЕЗОПАСНОСТЬ", zh: "安全", ja: "セキュリティ" },
  "FUNCTIONS": { es: "FUNCIONES", fr: "FONCTIONS", ru: "ФУНКЦИИ", zh: "函数", ja: "機能" },
  "STRESS": { es: "ESTRÉS", fr: "STRESS", ru: "СТРЕСС", zh: "压力", ja: "ストレス" },
  "REPORT INDEX": { es: "ÍNDICE DE REPORTE", fr: "INDEX DU RAPPORT", ru: "ИНДЕКС ОТЧЕТА", zh: "报告索引", ja: "レポートインデックス" },
  "UI LIBS": { es: "BIBLIOTECAS DE IU", fr: "BIBLIOTHÈQUES UI", ru: "БИБЛ. ИП", zh: "UI 库", ja: "UIライブラリ" },
  "FIBONACCI": { es: "FIBONACCI", fr: "FIBONACCI", ru: "ФИБОНАЧЧИ", zh: "斐波那契", ja: "フィボナッチ" },
  "TEST NAME": { es: "NOMBRE DE LA PRUEBA", fr: "NOM DU TEST", ru: "ИМЯ ТЕСТА", zh: "测试名称", ja: "テスト名" },
  "STATUS": { es: "ESTADO", fr: "STATUT", ru: "СТАТУС", zh: "状态", ja: "ステータス" },
  "DETAIL": { es: "DETALLE", fr: "DÉTAIL", ru: "ДЕТАЛЬ", zh: "详情", ja: "詳細" },
  "SKIPPED": { es: "OMITIDO", fr: "IGNORÉ", ru: "ПРОПУЩЕНО", zh: "已跳过", ja: "スキップ" },
  "VIEW DETAIL": { es: "VER DETALLE", fr: "VOIR LE DÉTAIL", ru: "ПОСМОТРЕТЬ", zh: "查看详情", ja: "詳細を表示" },
  "Executor does not support function": { es: "El ejecutor no soporta la función", fr: "L'exécuteur ne prend pas en charge la fonction", ru: "Исполнитель не поддерживает функцию", zh: "执行器不支持该功能", ja: "エグゼキューターは機能をサポートしていません" },
  "Executor does not support OS commands": { es: "El ejecutor no soporta comandos de SO", fr: "L'exécuteur ne pdc les cmds OS", ru: "Исп. не поддерживает команды ОС", zh: "执行器不支持操作系统命令", ja: "OSコマンドをサポートしていません" },
  "OK  ALL VECTORS  MITIGATED — no exploitable paths detected.": { es: "OK TODOS LOS VECTORES MITIGADOS — no se detectaron rutas", fr: "OK TOUS LES VECTEURS ATTÉNUÉS — aucun chemin", ru: "ОК ВСЕ ВЕКТОРЫ УСТРАНЕНЫ — не найдено путей", zh: "OK 所有向量缓解 — 无可利用路径", ja: "OK すべてのベクター緩和 — 悪用パスなし" },
  
  // Filters
  "FILTER": { es: "FILTRAR", fr: "FILTRER", ru: "ФИЛЬТР", zh: "过滤", ja: "フィルター" },
  "SORT": { es: "ORDENAR", fr: "TRIER", ru: "СОРТИРОВАТЬ", zh: "排序", ja: "並べ替え" },
  "ALL": { es: "TODO", fr: "TOUT", ru: "ВСЕ", zh: "全部", ja: "すべて" },
  "SECURE": { es: "SEGURO", fr: "SÉCURISÉ", ru: "БЕЗОПАСНО", zh: "安全", ja: "安全" },
  "WARNING": { es: "ADVERTENCIA", fr: "AVERTISSEMENT", ru: "ПРЕДУПРЕЖДЕНИЕ", zh: "警告", ja: "警告" },
  "VULN": { es: "VULN", fr: "VULN", ru: "УЯЗВИМОСТЬ", zh: "漏洞", ja: "脆弱" },

  // Review Page
  "SUBMIT REVIEW": { es: "ENVIAR RESEÑA", fr: "SOUMETTRE L'AVIS", ru: "ОТПРАВИТЬ ОТЗЫВ", zh: "提交评论", ja: "レビューを送信" },
  "FEEDBACK TERMINAL": { es: "TERMINAL DE RETROALIMENTACIÓN", fr: "TERMINAL DE RÉTROACTION", ru: "ТЕРМИНАЛ ОТЗЫВОВ", zh: "反馈终端", ja: "フィードバックターミナル" },
  "EXECUTOR NAME": { es: "NOMBRE DEL EJECUTOR", fr: "NOM DE L'EXÉCUTEUR", ru: "ИМЯ ИСПОЛНИТЕЛЯ", zh: "执行器名称", ja: "エグゼキューター名" },
  "SECURITY / PERFORMANCE RATING (1-5)": { es: "CLASIFICACIÓN DE SEGURIDAD / RENDIMIENTO (1-5)", fr: "ÉVALUATION SÉCURITÉ / PERFORMANCE (1-5)", ru: "РЕЙТИНГ БЕЗОПАСНОСТИ / ПРОИЗВОДИТЕЛЬНОСТИ (1-5)", zh: "安全/性能评级 (1-5)", ja: "セキュリティ・パフォーマンス評価（1〜5）" },
  "DETAILED ANALYSIS": { es: "ANÁLISIS DETALLADO", fr: "ANALYSE DÉTAILLÉE", ru: "ДЕТАЛЬНЫЙ АНАЛИЗ", zh: "详细分析", ja: "詳細な分析" },
  "TRANSMIT FEEDBACK": { es: "TRANSMITIR RETROALIMENTACIÓN", fr: "TRANSMETTRE LA RÉTROACTION", ru: "ПЕРЕДАТЬ ОТЗЫВ", zh: "传输反馈", ja: "フィードバックを送信" },
  
  // Theme Window
  "THEMES": { es: "TEMAS", fr: "THÈMES", ru: "ТЕМЫ", zh: "主题", ja: "テーマ" },
  "CLASSIC GREEN": { es: "VERDE CLÁSICO", fr: "VERT CLASSIQUE", ru: "КЛАССИЧЕСКИЙ ЗЕЛЕНЫЙ", zh: "经典绿", ja: "クラシックグリーン" },
  "NEON PINK": { es: "ROSA NEÓN", fr: "ROSE NÉON", ru: "НЕОНОВЫЙ РОЗОВЫЙ", zh: "霓虹粉", ja: "ネオンピンク" },
  "CHILL CHERRY": { es: "CEREZA CHILL", fr: "CERISE CHILL", ru: "ВИШНЕВЫЙ", zh: "冷樱桃", ja: "チルチェリー" },
  "OCEAN BLUE": { es: "AZUL OCÉANO", fr: "BLEU OCÉAN", ru: "ОКЕАНСКИЙ СИНИЙ", zh: "海洋蓝", ja: "オーシャンブルー" },
  "DRACULA PURPLE": { es: "PÚRPURA DRÁCULA", fr: "VIOLET DRACULA", ru: "ДРАКУЛА ФИОЛЕТОВЫЙ", zh: "德古拉紫", ja: "ドラキュラパープル" },
  "SOLAR ORANGE": { es: "NARANJA SOLAR", fr: "ORANGE SOLAIRE", ru: "СОЛНЕЧНЫЙ ОРАНЖЕВЫЙ", zh: "太阳橙", ja: "ソーラーオレンジ" },
  "PURE GOLD": { es: "ORO PURO", fr: "OR PUR", ru: "ЧИСТОЕ ЗОЛОТО", zh: "纯金", ja: "ピュアゴールド" },
  "FROSTBITE": { es: "CONGELACIÓN", fr: "GELURE", ru: "ОБМОРОЖЕНИЕ", zh: "冻伤", ja: "フロストバイト" },
  "RADIOACTIVE": { es: "RADIACTIVO", fr: "RADIOACTIF", ru: "РАДИОАКТИВНЫЙ", zh: "放射性", ja: "放射性" },
  "DEEP VIOLET": { es: "VIOLETA PROFUNDO", fr: "VIOLET PROFOND", ru: "ГЛУБОКИЙ ФИОЛЕТОВЫЙ", zh: "深紫罗兰", ja: "ディープバイオレット" },
  "BLOOD RED": { es: "ROJO SANGRE", fr: "ROUGE SANG", ru: "КРОВАВО-КРАСНЫЙ", zh: "血红", ja: "ブラッドレッド" },
  "MONOCHROME": { es: "MONOCROMO", fr: "MONOCHROME", ru: "МОНОХРОМНЫЙ", zh: "单色", ja: "モノクロ" },

  // Add more dynamic replacements
  "INITIALIZING...": { es: "INICIALIZANDO...", fr: "INITIALISATION...", ru: "ИНИЦИАЛИЗАЦИЯ...", zh: "初始化中...", ja: "初期化中..." },

  "ExecEnvHealthCheck is a comprehensive Roblox executor diagnostic suite. It tests security vectors, function coverage, UI library compatibility, and raw performance - generating a self-contained HTML report.": { 
      es: "ExecEnvHealthCheck es una completa suite de diagnóstico de ejecutores de Roblox. Prueba vectores de seguridad, cobertura de funciones, compatibilidad con bibliotecas de IU y rendimiento bruto, generando un informe HTML autónomo.",
      fr: "ExecEnvHealthCheck est une suite complète de diagnostic d'exécuteurs Roblox. Il teste les vecteurs de sécurité, la couverture des fonctions, la compatibilité de la bibliothèque d'interface utilisateur et les performances brutes, générant un rapport HTML autonome.",
      ru: "ExecEnvHealthCheck — это комплексный набор для диагностики исполнителей Roblox. Он тестирует векторы безопасности, покрытие функций, совместимость библиотек ИП и чистую производительность, генерируя автономный HTML-отчет.",
      zh: "ExecEnvHealthCheck 是一套全面的 Roblox 执行器诊断套件。它测试安全向量、功能覆盖率、UI库兼容性和原始性能，并生成一个独立的HTML报告。",
      ja: "ExecEnvHealthCheckは、包括的なRobloxエグゼキューター診断スイートです。セキュリティベクトル、機能の網羅範囲、UIライブラリの互換性、および生のパフォーマンスをテストし、自己完結型のHTMLレポートを生成します。"
  },
  "The script is ran inside any executor. It probes 100+ vulnerability vectors, benchmarks 50+ executor functions, stress-tests the Lua VM, and computes big Fibonacci numbers; then writes a detailed .html report.": { 
      es: "El script se ejecuta dentro de cualquier ejecutor. Prueba más de 100 vectores de vulnerabilidad, evalúa más de 50 funciones, realiza pruebas de estrés en la VM de Lua y calcula números grandes de Fibonacci; luego escribe un informe .html detallado.",
      fr: "Le script est exécuté à l'intérieur de n'importe quel exécuteur. Il sonde plus de 100 vecteurs de vulnérabilité, évalue plus de 50 fonctions, teste la résistance de la VM Lua et calcule de grands nombres de Fibonacci ; puis écrit un rapport .html détaillé.",
      ru: "Скрипт запускается внутри любого исполнителя. Он проверяет 100+ векторов уязвимостей, оценивает 50+ функций, проводит стресс-тест виртуальной машины Lua и вычисляет большие числа Фибоначчи; затем пишет подробный .html отчет.",
      zh: "该脚本在任何执行器内运行。它探测100多个漏洞变体，对50多个执行器函数进行基准测试，对Lua VM进行压力测试，并计算大斐波那契数；然后编写一份详细的 .html 报告。",
      ja: "スクリプトは任意のエグゼキューター内で実行されます。100以上の脆弱性ベクターをプローブし、50以上のベンチマーク機能、Lua VMのストレステストを行い、フィボナッチ大数を計算し、詳細な .html レポートを作成します。"
  },
  "The site contains all the latest official reports of nerfine's tests. Reports update live - no refresh needed.": { 
      es: "El sitio contiene los últimos informes oficiales de las pruebas de nerfine. Los informes se actualizan en vivo, sin necesidad de recargar.",
      fr: "Le site contient tous les derniers rapports officiels des tests de nerfine. Les rapports se mettent à jour en direct - aucune actualisation requise.",
      ru: "На сайте представлены все последние официальные отчеты тестов nerfine. Отчеты обновляются в реальном времени — обновление страницы не требуется.",
      zh: "该站点包含nerfine测试的所有最新官方报告。报告实时更新 - 无需刷新。",
      ja: "このサイトにはnerfineのテストに関するすべての最新の公式レポートが含まれています。レポートはライブで更新されます-リロードは必要ありません。"
  },
  "Describe your experience with the selected product...": {
      es: "Describe tu experiencia con el producto seleccionado...",
      fr: "Décrivez votre expérience avec le produit sélectionné...",
      ru: "Опишите свой опыт использования выбранного продукта...",
      zh: "描述您对所选产品的体验...",
      ja: "選択した製品での体験を説明してください..."
  },
  "e.g. Cosmic, Madium, etc.": {
      es: "ej. Cosmic, Madium, etc.",
      fr: "ex. Cosmic, Madium, etc.",
      ru: "напр. Cosmic, Madium и т.д.",
      zh: "例如 Cosmic, Madium 等",
      ja: "例：Cosmic、Madiumなど"
  },
  "Search executor name...": {
      es: "Buscar nombre del ejecutor...",
      fr: "Rechercher le nom de l'exécuteur...",
      ru: "Поиск имени исполнителя...",
      zh: "搜索执行器名称...",
      ja: "エグゼキューター名を検索..."
  },
  "MITIGATED": {
      es: "MITIGADO",
      fr: "ATTÉNUÉ",
      ru: "УСТРАНЕНО",
      zh: "已缓解",
      ja: "緩和済み"
  },
  "AVG SPEED": {
      es: "VEL. PROM.",
      fr: "VIT. MOY.",
      ru: "СР. СКОР.",
      zh: "平均速度",
      ja: "平均速度"
  },
  "STRESS OK": {
      es: "ESTRÉS OK",
      fr: "EFFORT OK",
      ru: "СТРЕСС ОК",
      zh: "压力正常",
      ja: "ストレスOK"
  },
  "6 VULN": {
      es: "6 VULN",
      fr: "6 VULN",
      ru: "6 УЯЗВ",
      zh: "6 漏洞",
      ja: "6 脆弱性"
  },
  "UI 11/13": {
      es: "IU 11/13",
      fr: "UI 11/13",
      ru: "ИП 11/13",
      zh: "UI 11/13",
      ja: "UI 11/13"
  },
  "NO FEEDBACK RECORDS FOUND": {
      es: "NO SE ENCONTRARON REGISTROS DE RETROALIMENTACIÓN",
      fr: "AUCUN REGISTRE DE RÉTROACTION TROUVÉ",
      ru: "ЗАПИСЕЙ ОТЗЫВОВ НЕ НАЙДЕНО",
      zh: "未找到反馈记录",
      ja: "フィードバック記録が見つかりません"
  },

  // Info items
  "SEC": { es: "SEG", fr: "SÉC", ru: "БЕЗ", zh: "安全", ja: "セキュリティ" },
  "100+ vulnerability vectors": { es: "100+ vectores de vulnerabilidad", fr: "100+ vecteurs de vulnérabilité", ru: "100+ векторов уязвимостей", zh: "100多个漏洞变体", ja: "100以上の脆弱性ベクター" },
  "FN": { es: "FN", fr: "FN", ru: "ФУНК", zh: "函数", ja: "機能" },
  "50+ executor functions": { es: "50+ funciones de ejecutor", fr: "50+ fonctions d'exécuteur", ru: "50+ функций исполнителя", zh: "50多个执行器函数", ja: "50以上の実行機能" },
  "PERF": { es: "REND", fr: "PERF", ru: "ПРОИЗ", zh: "性能", ja: "パフォーマンス" },
  "6-stage stress test": { es: "Prueba de estrés de 6 etapas", fr: "Test d'effort en 6 étapes", ru: "6-этапный стресс-тест", zh: "6阶段压力测试", ja: "6段階のストレステスト" },
  "BIG": { es: "GRA", fr: "GRO", ru: "БОЛ", zh: "大", ja: "大" },
  "Fibonacci big-integer benchmark": { es: "Benchmark de enteros grandes de Fibonacci", fr: "Benchmark de grands entiers de Fibonacci", ru: "Тест больших чисел Фибоначчи", zh: "斐波那契大整数基准测试", ja: "フィボナッチ大整数ベンチマーク" },
  "UI": { es: "IU", fr: "UI", ru: "ИП", zh: "用户界面", ja: "UI" },
  "13 UI library checks": { es: "13 comprobaciones de biblioteca de IU", fr: "13 vérifications de la bibliothèque d'interface utilisateur", ru: "13 проверок библиотеки ИП", zh: "13个UI库检查", ja: "13のUIライブラリチェック" },
  "LIVE": { es: "VIVO", fr: "DIRECT", ru: "ЖИВОЙ", zh: "直播", ja: "ライブ" },
  "Live VPS sync": { es: "Sincronización VPS en vivo", fr: "Synchronisation VPS en direct", ru: "Живая синхронизация VPS", zh: "实时VPS同步", ja: "ライブVPS同期" },
  "PRIV": { es: "PRIV", fr: "CONF", ru: "КОНФ", zh: "隐私", ja: "プライバシー" },
  "VPS IP never exposed": { es: "IP del VPS nunca expuesta", fr: "L'IP du VPS n'est jamais exposée", ru: "IP VPS никогда не раскрывается", zh: "VPS IP从未暴露", ja: "VPS IPは決して公開されません" },
  "SYS": { es: "SIS", fr: "SYS", ru: "СИС", zh: "系统", ja: "システム" },
  "ExecEnvHealthCheck v3.2": { es: "ExecEnvHealthCheck v3.2", fr: "ExecEnvHealthCheck v3.2", ru: "ExecEnvHealthCheck v3.2", zh: "ExecEnvHealthCheck v3.2", ja: "ExecEnvHealthCheck v3.2" },
  "SECURITY ↓": { es: "SEGURIDAD ↓", fr: "SÉCURITÉ ↓", ru: "БЕЗОПАСНОСТЬ ↓", zh: "安全 ↓", ja: "セキュリティ ↓" },
  "SECURITY ↑": { es: "SEGURIDAD ↑", fr: "SÉCURITÉ ↑", ru: "БЕЗОПАСНОСТЬ ↑", zh: "安全 ↑", ja: "セキュリティ ↑" },
  "FUNCTIONS ↓": { es: "FUNCIONES ↓", fr: "FONCTIONS ↓", ru: "ФУНКЦИИ ↓", zh: "函数 ↓", ja: "機能 ↓" },
  "FUNCTIONS ↑": { es: "FUNCIONES ↑", fr: "FONCTIONS ↑", ru: "ФУНКЦИИ ↑", zh: "函数 ↑", ja: "機能 ↑" },
  "SPEED ↓": { es: "VELOCIDAD ↓", fr: "VITESSE ↓", ru: "СКОРОСТЬ ↓", zh: "速度 ↓", ja: "速度 ↓" },
  "SPEED ↑": { es: "VELOCIDAD ↑", fr: "VITESSE ↑", ru: "СКОРОСТЬ ↑", zh: "速度 ↑", ja: "速度 ↑" },
  "PRIVACY CHECK": { es: "VERIFICACIÓN DE PRIVACIDAD", fr: "VÉRIFICATION DE CONFIDENTIALITÉ", ru: "ПРОВЕРКА КОНФИДЕНЦИАЛЬНОСТИ", zh: "隐私检查", ja: "プライバシーチェック" },
  "SECURITY SCAN": { es: "ESCANEO DE SEGURIDAD", fr: "ANALYSE DE SÉCURITÉ", ru: "СКАНЕР БЕЗОПАСНОСТИ", zh: "安全扫描", ja: "セキュリティスキャン" },
  "PERFORMANCE TEST": { es: "PRUEBA DE RENDIMIENTO", fr: "TEST DE PERFORMANCE", ru: "ТЕСТ ПРОИЗВОДИТЕЛЬНОСТИ", zh: "性能测试", ja: "パフォーマンステスト" },
  "VULNERABILITY ANALYSIS": { es: "ANÁLISIS DE VULNERABILIDAD", fr: "ANALYSE DE VULNÉRABILITÉ", ru: "АНАЛИЗ УЯЗВИМОСТЕЙ", zh: "漏洞分析", ja: "脆弱性分析" },
  "EXECUTOR FUNCTIONS": { es: "FUNCIONES DEL EJECUTOR", fr: "FONCTIONS DE L'EXÉCUTEUR", ru: "ФУНКЦИИ ИСПОЛНИТЕЛЯ", zh: "执行器功能", ja: "実行者機能" },
  "STRESS TEST": { es: "PRUEBA DE ESTRÉS", fr: "TEST D'EFFORT", ru: "СТРЕСС-ТЕСТ", zh: "压力测试", ja: "ストレステスト" },
  "VPS ISOLATION": { es: "AISLAMIENTO DEL VPS", fr: "ISOLEMENT DU VPS", ru: "ИЗОЛЯЦИЯ VPS", zh: "VPS隔离", ja: "VPS分離" },
  "IP EXPOSURE CHECK": { es: "VERIFICACIÓN DE EXPOSICIÓN DE IP", fr: "VÉRIFICATION DE L'EXPOSITION IP", ru: "ПРОВЕРКА РАСКРЫТИЯ IP", zh: "IP暴露检查", ja: "IP露出チェック" },
  "ENGLISH": { es: "INGLÉS", fr: "ANGLAIS", ru: "АНГЛИЙСКИЙ", zh: "英语", ja: "英語" },
  "ESPAÑOL": { es: "ESPAÑOL", fr: "ESPAGNOL", ru: "ИСПАНСКИЙ", zh: "西班牙语", ja: "スペイン語" },
  "FRANÇAIS": { es: "FRANCÉS", fr: "FRANÇAIS", ru: "ФРАНЦУЗСКИЙ", zh: "法语", ja: "フランス語" },
  "РУССКИЙ": { es: "RUSO", fr: "RUSSE", ru: "РУССКИЙ", zh: "俄语", ja: "ロシア語" },
  "中文": { es: "CHINO", fr: "CHINOIS", ru: "КИТАЙСКИЙ", zh: "中文", ja: "中国語" },
  "日本語": { es: "JAPONÉS", fr: "JAPONAIS", ru: "ЯПОНСКИЙ", zh: "日语", ja: "日本語" }
};

function applyLang(lang) {
  if (!lang || lang === 'en') return;

  const isReportPage = window.location.pathname && window.location.pathname.match(/_Report\.html/i) !== null;
  
  function walk(node) {
    // If the node has a custom flag meaning it was just translated, skip
    if (node._translated) return;

    if (node.nodeType === 3) { // Text node
      let orig = node.nodeValue;
      let matched = false;
      let replaced = orig;

      const trimOrig = orig.trim();
      let resText = null;
      
      if (trimOrig && DICT[trimOrig] && DICT[trimOrig][lang]) {
        resText = DICT[trimOrig][lang];
        if (isReportPage) resText += " (" + trimOrig + ")";
        
        const leading = node.nodeValue.match(/^\s*/)[0];
        const trailing = node.nodeValue.match(/\s*$/)[0];
        node.nodeValue = leading + resText + trailing;
        // Do not process this node's substring
        return;
      }
      
      if (isReportPage && orig.trim().length > 0) {
        Object.keys(DICT).forEach(k => {
           if (k.length > 3 && replaced.includes(k) && !k.match(/^[0-9]+$/)) {
              // Ensure we don't replace if it's already inside brackets like "(UI LIBS)"
              const regex = new RegExp(`(?<!\\()\\b${k}\\b(?!\\))|(?<!\\()${k}(?!\\))`, 'g');
              replaced = replaced.replace(regex, DICT[k][lang] + " (" + k + ")");
              matched = true;
           }
        });
        if (matched && replaced !== orig) {
           node.nodeValue = replaced;
        }
      }

    } else if (node.nodeType === 1) { // Element node
      if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE') return;
      
      if (node.children.length === 0) {
        const orig = node.innerText ? node.innerText.trim() : node.textContent.trim();
        if (orig && DICT[orig] && DICT[orig][lang]) {
          if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
            const p = node.getAttribute('placeholder');
            if (p && DICT[p] && DICT[p][lang]) node.setAttribute('placeholder', DICT[p][lang]);
          } else {
             let t = DICT[orig][lang];
             if (isReportPage) t += " (" + orig + ")";
             node.innerText = t;
             node.childNodes.forEach(cn => cn._translated = true);
          }
        }
      }
      
      if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
        const p = node.getAttribute('placeholder');
        if (p && DICT[p] && DICT[p][lang]) node.setAttribute('placeholder', DICT[p][lang]);
      }
      
      for (let i = 0; i < node.childNodes.length; i++) {
        walk(node.childNodes[i]);
      }
    }
  }
  
  const DICT = LANG_DICT;
  walk(document.body);
  
  // Specific data-val handlers for animated texts like the EXEC HEALTH RESULTS hero
  document.querySelectorAll('[data-val]').forEach(el => {
     let orig = el.dataset.val;
     if (DICT[orig] && DICT[orig][lang]) {
         el.dataset.val = DICT[orig][lang];
         el.innerText = DICT[orig][lang];
     }
  });

  document.documentElement.setAttribute('lang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
    let l = localStorage.getItem('lang_chosen');
    if (l && l !== 'en') {
       applyLang(l);
    }
});

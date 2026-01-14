import React, { useState, useEffect } from 'react';
import {
  Menu, X, Phone, Mail, MapPin, ChevronRight, CheckCircle,
  Tractor, Sprout, Milk, Settings, ArrowRight, Activity,
  Droplet, Truck, Users, Globe, ChevronDown, Calculator, Building2
} from 'lucide-react';

// --- Calculator Configuration ---
const CALC_CONSTANTS = {
  totalHerdMultiplier: 2.2, // На 1 корову приходится 1.2 головы молодняка (всего 2.2)
  areaPerHead: 10.5,        // Средняя площадь здания на 1 голову (включая проходы)
  manurePerCowUnit6Mo: 13,  // м3 навоза (от коровы + шлейфа) за 6 месяцев
  feedPerCowUnitYear: 20.5, // Тонн корма (силос+сенаж) на 1 корову+шлейф в год
};

const AgroTechApp = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLang, setActiveLang] = useState('RU');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  // Simple "Estimate" Calculator State
  const [cowsInput, setCowsInput] = useState(800);
  const [calcResults, setCalcResults] = useState({
    totalHerd: 0,
    area: 0,
    manure: 0,
    feed: 0
  });

  useEffect(() => {
    const val = parseFloat(cowsInput) || 0;
    const th = Math.round(val * CALC_CONSTANTS.totalHerdMultiplier);
    setCalcResults({
      totalHerd: th,
      area: Math.round(th * CALC_CONSTANTS.areaPerHead),
      manure: Math.round(val * CALC_CONSTANTS.manurePerCowUnit6Mo),
      feed: Math.round(val * CALC_CONSTANTS.feedPerCowUnitYear)
    });
  }, [cowsInput]);

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleModalSubmit = (e) => {
    e.preventDefault();
    alert('Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.');
    setShowModal(false);
    setFormData({ name: '', phone: '', message: '' });
  };

  const heroSlides = [
    {
      title: <>Комплексное проектирование <br /><span className="text-green-400">молочно-товарных ферм</span></>,
      subtitle: 'Инновации в Агробизнесе',
      features: [
        'Расчет и консультация технологических решений',
        'Эскизный проект и мастер план',
        'Получение разрешений на строительство',
        'Разработка и согласование ПСД',
        'Сопровождение при строительстве'
      ]
    },
    {
      title: <>Проектирование <br /><span className="text-green-400">откормочных площадок</span></>,
      subtitle: 'Эффективные решения',
      features: [
        'Расчет и консультация технологических решений',
        'Эскизный проект и мастер план',
        'Получение разрешений на строительство',
        'Разработка и согласование ПСД',
        'Сопровождение при строительстве'
      ]
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { name: 'Главная', href: '#home' },
    { name: 'О компании', href: '#about' },
    {
      name: 'Расчет и проектирования МТФ',
      href: '#solutions',
      children: [
        { name: 'Эскизный проект и мастер план', href: '#sketch-project' },
        { name: 'Разработка и согласования ПСД', href: '#psd' },
        { name: 'Сопровождение при строительстве', href: '#construction-support' },
        { name: 'Решения для МТФ', href: '#mtf-solutions' }
      ]
    },
    {
      name: 'Прочие сельхозобъекты',
      href: '#other-solutions',
      children: [
        { name: 'Откормочные площадки для КРС и МРС', href: '#feedlots' },
        { name: 'Кормоцехи', href: '#feed-mills' }
      ]
    },
    { name: 'Услуги', href: '#services' },
    { name: 'Калькулятор', href: '#calculator' },
    { name: 'Контакты', href: '#contacts' },
  ];

  const solutions = [
    {
      id: 1,
      title: 'Эскизный проект и мастер план',
      desc: 'Разработка концепции и генерального плана будущего комплекса с учетом всех технологических требований и розы ветров.',
      icon: <Building2 size={40} className="text-blue-600" />,
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      title: 'Разработка и согласования ПСД',
      desc: 'Полный пакет проектно-сметной документации (ПСД), прохождение экспертизы и получение всех разрешений.',
      icon: <Settings size={40} className="text-green-600" />,
      image: 'https://images.unsplash.com/photo-1581094794320-c914639972b9?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 3,
      title: 'Сопровождение при строительстве',
      desc: 'Авторский и технический надзор. Контроль качества работ и соблюдения сроков на всех этапах строительства.',
      icon: <Tractor size={40} className="text-amber-600" />,
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 4,
      title: 'Решения для МТФ',
      desc: 'Комплексное оснащение ферм: доильные залы, стойловое оборудование, системы навозоудаления и вентиляции.',
      icon: <Milk size={40} className="text-emerald-500" />,
      image: 'https://images.unsplash.com/photo-1527153857715-390862d703d5?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const otherSolutions = [
    {
      id: 1,
      title: 'Откормочные площадки для КРС и МРС',
      desc: 'Профессиональное проектирование загонов, систем поения и кормления для эффективного откорма.',
      icon: <Tractor size={40} className="text-amber-600" />,
      image: 'https://images.unsplash.com/photo-1516467508483-a72120615603?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      title: 'Кормоцехи',
      desc: 'Автоматизированные линии приготовления кормов: дробление, смешивание и грануляция.',
      icon: <Settings size={40} className="text-orange-600" />,
      image: 'https://images.unsplash.com/photo-1627920155050-2bc1586bd27f?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const services = [
    {
      title: 'Проектирование',
      icon: <Settings size={32} />,
      desc: 'Разработка технологических проектов ферм с нуля, включая генпланы и инженерные сети.'
    },
    {
      title: 'Поставка оборудования',
      icon: <Truck size={32} />,
      desc: 'Официальный дилер ведущих мировых брендов. Прямые поставки из Европы и Израиля.'
    },
    {
      title: 'Монтаж и сервис',
      icon: <Tractor size={32} />,
      desc: 'Команда сертифицированных инженеров. Монтаж, пуско-наладка и обслуживание 24/7.'
    },
    {
      title: 'Консалтинг',
      icon: <Users size={32} />,
      desc: 'Аудит существующих хозяйств, обучение персонала и внедрение эффективных протоколов.'
    }
  ];

  return (
    <div className="font-sans text-slate-800 bg-slate-50 min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="bg-slate-900 text-slate-300 py-2 text-xs sm:text-sm hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex space-x-6">
            <span className="flex items-center hover:text-white cursor-pointer transition">
              <Phone size={14} className="mr-2" /> +7 777 935 8855
            </span>
            <span className="flex items-center hover:text-white cursor-pointer transition">
              <Mail size={14} className="mr-2" /> info@plutonstroy.kz
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center hover:text-white cursor-pointer transition">
              <MapPin size={14} className="mr-2" /> г. Астана, ул. Кенесары 8, Казахстан
            </span>
            <div className="flex space-x-2 border-l border-slate-700 pl-4">
              {['RU', 'KZ', 'EN'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`font-semibold hover:text-white transition ${activeLang === lang ? 'text-white' : 'text-slate-500'}`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 backdrop-blur-sm py-4'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-green-600 p-2 rounded-lg">
              <Sprout size={24} className="text-white" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Pluton<span className="text-green-600">Stroy</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group h-full flex items-center">
                <a
                  href={link.href}
                  className="text-sm font-semibold text-slate-600 hover:text-green-600 transition uppercase tracking-wide flex items-center py-2"
                >
                  {link.name}
                  {link.children && <ChevronDown size={14} className="ml-1 mt-0.5" />}
                </a>

                {link.children && (
                  <div className="absolute top-full left-0 mt-0 w-72 bg-white shadow-xl rounded-b-lg border-x border-b border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left z-50">
                    <div className="py-2">
                      {link.children.map((child) => (
                        <a
                          key={child.name}
                          href={child.href}
                          className="block px-6 py-3 text-sm text-slate-700 hover:bg-green-50 hover:text-green-600 transition border-b border-slate-50 last:border-0"
                        >
                          {child.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-full font-medium transition shadow-lg shadow-green-600/20 transform hover:-translate-y-0.5"
            >
              Оставить заявку
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-slate-700" onClick={toggleMenu}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t absolute w-full left-0 shadow-lg animate-in slide-in-from-top-5 fade-in duration-200">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-700 font-medium py-2 border-b border-slate-100 last:border-0 hover:text-green-600 flex justify-between items-center w-full"
                    onClick={() => !link.children && setIsMenuOpen(false)}
                  >
                    {link.name}
                    {link.children && <ChevronDown size={16} />}
                  </a>
                  {link.children && (
                    <div className="pl-4 bg-slate-50 rounded-lg mt-1 mb-2">
                      {link.children.map((child) => (
                        <a
                          key={child.name}
                          href={child.href}
                          className="block text-sm text-slate-600 hover:text-green-600 py-3 border-b border-slate-100 last:border-0"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {child.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <button
                onClick={() => { setShowModal(true); setIsMenuOpen(false); }}
                className="bg-green-600 text-white py-3 rounded-lg font-bold text-center w-full"
              >
                Оставить заявку
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header id="home" className="relative h-[650px] sm:h-[750px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2232"
            alt="Farm field"
            className="w-full h-full object-cover transition-transform duration-1000 transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-slate-900/40"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-4xl relative min-h-[400px] flex items-center">
            <div key={currentSlide} className="animate-in slide-in-from-bottom-5 fade-in duration-700 w-full">
              <div className="inline-block bg-green-600/20 border border-green-500/30 px-4 py-1.5 rounded-full mb-6 backdrop-blur-md">
                <span className="text-green-400 font-semibold text-sm uppercase tracking-wider">{heroSlides[currentSlide].subtitle}</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">
                {heroSlides[currentSlide].title}
              </h1>

              <ul className="text-base sm:text-lg text-slate-300 mb-8 space-y-2 max-w-3xl">
                {heroSlides[currentSlide].features.map((feature, idx) => (
                  <li key={idx} className="flex items-start"><CheckCircle size={20} className="text-green-400 mr-3 mt-1 flex-shrink-0" /> {feature}</li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => setShowModal(true)} className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition flex items-center justify-center">
                  Получить консультацию <ChevronRight className="ml-2" />
                </button>
                <a href="#solutions" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-lg font-bold text-lg transition flex items-center justify-center">
                  Решения для МТФ
                </a>
              </div>
            </div>
          </div>

          {/* Slider Dots */}
          <div className="absolute bottom-10 left-4 sm:left-1/2 sm:-translate-x-1/2 flex space-x-3">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${idx === currentSlide ? 'w-10 bg-green-500' : 'w-2.5 bg-slate-500/50 hover:bg-slate-400'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="bg-white py-10 shadow-sm relative z-20 -mt-10 mx-4 sm:mx-10 rounded-xl border border-slate-100">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100">
            <div className="p-4">
              <div className="text-3xl sm:text-4xl font-bold text-green-400 mb-2">25+</div>
              <div className="text-slate-500 text-sm uppercase font-semibold">Лет на рынке</div>
            </div>
            <div className="p-4">
              <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-slate-500 text-sm uppercase font-semibold">Реализованных проектов</div>
            </div>
            <div className="p-4">
              <div className="text-3xl sm:text-4xl font-bold text-green-400 mb-2">24/7</div>
              <div className="text-slate-500 text-sm uppercase font-semibold">Сервисная поддержка</div>
            </div>
            <div className="p-4">
              <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-slate-500 text-sm uppercase font-semibold">Гарантия качества</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1595244585145-c8e6a2b212f7?auto=format&fit=crop&q=80&w=1000"
                  alt="Modern Cow Farm"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 left-0 bg-green-600 text-white p-6 rounded-tr-2xl">
                  <p className="font-bold text-xl">Официальный дилер</p>
                  <p className="opacity-90">Ведущих мировых брендов</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h4 className="text-green-400 font-bold uppercase tracking-wide mb-2">О компании PlutonStroy</h4>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Ваш надежный партнер в молочном бизнесе</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                PlutonStroy — это инжиниринговая компания, предоставляющая полный спектр услуг для животноводства в Казахстане.
                Мы не просто продаем оборудование, мы создаем эффективные экосистемы для вашего бизнеса.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Комплексное проектирование и строительство ферм',
                  'Внедрение систем автоматизации и управления стадом',
                  'Обучение персонала современным технологиям',
                  'Собственный склад запчастей и сервисная служба'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="text-green-400 font-bold border-b-2 border-green-600 pb-1 hover:text-green-800 transition">
                Узнать больше о нас
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions / Catalog Section */}
      <section id="solutions" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Расчет и проектирования МТФ</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Мы предлагаем передовые технологии, которые делают производство молока рентабельным,
              а жизнь животных — комфортной.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {solutions.map((item) => (
              <div key={item.id} className="group bg-white rounded-xl overflow-hidden border border-slate-100 hover:shadow-xl transition duration-300">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition z-10"></div>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-4 bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center -mt-14 relative z-20 border-4 border-white shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-green-400 transition">{item.title}</h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                    {item.desc}
                  </p>
                  <a href="#" className="inline-flex items-center text-green-400 font-semibold text-sm hover:underline">
                    Подробнее <ArrowRight size={16} className="ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Solutions Section */}
      <section id="other-solutions" className="py-20 bg-slate-900 text-white border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Прочие сельхозобъекты</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Эффективные решения для различных направлений животноводства
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {otherSolutions.map((item) => (
              <div key={item.id} className="group bg-white rounded-xl overflow-hidden border border-slate-700 hover:shadow-2xl hover:shadow-blue-900/20 transition duration-300">
                <div className="h-64 overflow-hidden relative">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition z-10"></div>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                  />
                </div>
                <div className="p-8">
                  <div className="mb-4 bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center -mt-16 relative z-20 border-4 border-white shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition">{item.title}</h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    {item.desc}
                  </p>
                  <a href="#" className="inline-flex items-center text-amber-600 font-semibold hover:underline">
                    Подробнее <ArrowRight size={16} className="ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      {/* Services Section */}
      <section id="services" className="py-20 bg-slate-50 text-slate-900 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-100 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none opacity-60"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h4 className="text-green-600 font-bold uppercase tracking-wide mb-2">Наши услуги</h4>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Полный цикл поддержки</h2>
            </div>
            <button onClick={() => setShowModal(true)} className="mt-6 md:mt-0 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-green-600 px-6 py-2 rounded-lg transition shadow-sm">
              Скачать презентацию
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-slate-50 border border-slate-200 p-8 rounded-2xl hover:border-green-400 hover:shadow-lg transition duration-300 group">
                <div className="bg-white w-14 h-14 rounded-lg flex items-center justify-center mb-6 text-green-600 shadow-sm group-hover:bg-green-600 group-hover:text-white transition duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>



      <section id="calculator" className="py-20 relative overflow-hidden shrink-0" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' }}>
        <div className="container mx-auto px-4 relative z-10">

          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-3">
              Проектирование молочных комплексов
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Оцените масштаб вашего будущего проекта за 30 секунд.
              Расчет инфраструктуры на основе нормативов НТП 17-99.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="backdrop-blur-md bg-white/95 border border-white/50 shadow-xl rounded-3xl p-8 h-full flex flex-col justify-center">
                <div className="mb-8">
                  <label className="block text-slate-700 font-bold text-xl mb-4">
                    Планируемое поголовье
                    <span className="block text-sm font-normal text-slate-500 mt-1">Только фуражные коровы</span>
                  </label>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-full">
                      <input
                        type="number"
                        min="50"
                        max="5000"
                        value={cowsInput}
                        onChange={(e) => setCowsInput(e.target.value)}
                        className="w-full text-4xl font-bold text-emerald-600 border-b-2 border-emerald-600 bg-transparent focus:outline-none pb-2 text-center"
                      />
                      <span className="absolute right-0 bottom-3 text-slate-400 font-bold text-lg">гол.</span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min="50"
                    max="5000"
                    step="50"
                    value={cowsInput}
                    onChange={(e) => setCowsInput(e.target.value)}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                </div>

                <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
                  <h4 className="font-bold text-emerald-800 mb-2 flex items-center">
                    <Calculator size={18} className="mr-2" />
                    Что мы посчитаем?
                  </h4>
                  <ul className="text-sm text-emerald-700 space-y-2">
                    <li>• Общее стадо с учетом шлейфа</li>
                    <li>• Требуемые площади коровников</li>
                    <li>• Объем навозохранилищ (6 мес.)</li>
                    <li>• Объем кормовых центров</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Card 1 */}
                <div className="backdrop-blur-md bg-white/95 border border-slate-100 shadow-xl rounded-2xl p-6 border-l-4 border-l-blue-500 hover:-translate-y-1 transition duration-300">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-slate-500 font-medium text-sm uppercase tracking-wider">Общее стадо</div>
                    <Users className="text-blue-200" size={28} />
                  </div>
                  <div className="text-3xl font-bold text-slate-800 mb-1">
                    {calcResults.totalHerd.toLocaleString()} <span className="text-lg text-slate-400 font-normal">гол.</span>
                  </div>
                  <p className="text-xs text-slate-500">Коровы + молодняк (шлейф)</p>
                </div>

                {/* Card 2 */}
                <div className="backdrop-blur-md bg-white/95 border border-slate-100 shadow-xl rounded-2xl p-6 border-l-4 border-l-purple-500 hover:-translate-y-1 transition duration-300">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-slate-500 font-medium text-sm uppercase tracking-wider">Площадь зданий</div>
                    <Building2 className="text-purple-200" size={28} />
                  </div>
                  <div className="text-3xl font-bold text-slate-800 mb-1">
                    {calcResults.area.toLocaleString()} <span className="text-lg text-slate-400 font-normal">м²</span>
                  </div>
                  <p className="text-xs text-slate-500">Коровники и телятники (пятно застройки)</p>
                </div>

                {/* Card 3 */}
                <div className="backdrop-blur-md bg-white/95 border border-slate-100 shadow-xl rounded-2xl p-6 border-l-4 border-l-amber-500 hover:-translate-y-1 transition duration-300">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-slate-500 font-medium text-sm uppercase tracking-wider">Навозоудаление</div>
                    <Droplet className="text-amber-200" size={28} />
                  </div>
                  <div className="text-3xl font-bold text-slate-800 mb-1">
                    {calcResults.manure.toLocaleString()} <span className="text-lg text-slate-400 font-normal">м³</span>
                  </div>
                  <p className="text-xs text-slate-500">Объем лагун на 6 месяцев</p>
                </div>

                {/* Card 4 */}
                <div className="backdrop-blur-md bg-white/95 border border-slate-100 shadow-xl rounded-2xl p-6 border-l-4 border-l-green-500 hover:-translate-y-1 transition duration-300">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-slate-500 font-medium text-sm uppercase tracking-wider">Кормохранение</div>
                    <Sprout className="text-green-200" size={28} />
                  </div>
                  <div className="text-3xl font-bold text-slate-800 mb-1">
                    {calcResults.feed.toLocaleString()} <span className="text-lg text-slate-400 font-normal">тонн</span>
                  </div>
                  <p className="text-xs text-slate-500">Годовой запас (Силос + Сенаж)</p>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-8 bg-slate-900 rounded-2xl p-8 text-center md:text-left flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                <div className="relative z-10">
                  <h3 className="text-white text-xl font-bold mb-2">Нужен точный расчет и смета?</h3>
                  <p className="text-slate-400 text-sm max-w-md">
                    Мы разработаем полное ПСД: от генплана до прохождения экспертизы.
                    Оставьте заявку на детальный аудит.
                  </p>
                </div>
                <button onClick={() => setShowModal(true)} className="relative z-10 mt-6 md:mt-0 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-emerald-900/50 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3">
                  <span>Заказать ПСД</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners/Brands Mockup */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4">
          <p className="text-center text-slate-400 font-semibold uppercase tracking-widest mb-10 text-sm">
            Мы работаем с лучшими мировыми производителями
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Simple Text Placeholders for Brands to avoid external logo issues */}
            <div className="text-2xl font-black text-slate-800 font-serif">Afimilk</div>
            <div className="text-2xl font-black text-slate-800 italic">DeLaval</div>
            <div className="text-2xl font-black text-slate-800 tracking-tighter">GEA</div>
            <div className="text-2xl font-black text-slate-800 font-mono">Lely</div>
            <div className="text-2xl font-black text-slate-800 uppercase">BouMatic</div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacts" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h4 className="text-green-400 font-bold uppercase tracking-wide mb-2">Контакты</h4>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Свяжитесь с нами</h2>
              <p className="text-slate-600 mb-8">
                Оставьте заявку, и наши специалисты свяжутся с вами для консультации по вашему проекту.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-white p-3 rounded-lg shadow-sm text-green-400 mr-4">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">Офис в Алматы</h5>
                    <p className="text-slate-600">ул. Примерная, 123, Бизнес Центр Агро, офис 405</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-white p-3 rounded-lg shadow-sm text-green-400 mr-4">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">Телефоны</h5>
                    <p className="text-slate-600">+7 777 935 8855</p>
                    <p className="text-slate-600">+7 (727) 345-67-89</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-white p-3 rounded-lg shadow-sm text-green-400 mr-4">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">Email</h5>
                    <p className="text-slate-600">sales@plutonstroy.kz</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
              <h3 className="text-2xl font-bold mb-6">Оставить заявку</h3>
              <form onSubmit={handleModalSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Ваше имя</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                    placeholder="Иван Иванов"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Телефон</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                    placeholder="+7 (___) ___-__-__"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Сообщение</label>
                  <textarea
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                    placeholder="Интересует доильное оборудование..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>
                <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition transform hover:-translate-y-1 shadow-md">
                  Отправить
                </button>
                <p className="text-xs text-slate-500 text-center mt-4">
                  Нажимаю кнопку, вы соглашаетесь с политикой обработки персональных данных.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4 text-white">
                <Sprout size={24} className="text-green-500" />
                <span className="text-xl font-bold">PlutonStroy</span>
              </div>
              <p className="text-sm leading-relaxed mb-4">
                Современные решения для молочных ферм в Казахстане. Качество, проверенное временем.
              </p>
              <div className="flex space-x-4">
                {/* Social placeholders */}
                <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center hover:bg-green-600 hover:text-white transition cursor-pointer">IG</div>
                <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center hover:bg-blue-600 hover:text-white transition cursor-pointer">FB</div>
                <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center hover:bg-red-600 hover:text-white transition cursor-pointer">YT</div>
              </div>
            </div>

            <div>
              <h5 className="text-white font-bold mb-4">Компания</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="hover:text-green-500 transition">О нас</a></li>
                <li><a href="#partners" className="hover:text-green-500 transition">Партнеры</a></li>
                <li><a href="#news" className="hover:text-green-500 transition">Новости</a></li>
                <li><a href="#careers" className="hover:text-green-500 transition">Вакансии</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-bold mb-4">Решения</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-green-500 transition">Доильные залы</a></li>
                <li><a href="#" className="hover:text-green-500 transition">Системы навозоудаления</a></li>
                <li><a href="#" className="hover:text-green-500 transition">Комфорт коров</a></li>
                <li><a href="#" className="hover:text-green-500 transition">Охлаждение молока</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-bold mb-4">Подписка</h5>
              <p className="text-sm mb-4">Получайте новости агро-индустрии первыми.</p>
              <div className="flex">
                <input type="email" placeholder="Email" className="bg-slate-800 border-none rounded-l-lg px-4 py-2 w-full focus:ring-1 focus:ring-green-500 outline-none" />
                <button className="bg-green-600 text-white px-3 rounded-r-lg hover:bg-green-700 transition">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; 2024 PlutonStroy. Все права защищены.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">Политика конфиденциальности</a>
              <a href="#" className="hover:text-white transition">Условия использования</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal Form */}
      {
        showModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-in zoom-in-95 duration-200">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
              >
                <X size={24} />
              </button>

              <div className="text-center mb-6">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Mail className="text-green-600" size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Свяжитесь с нами</h3>
                <p className="text-slate-500 text-sm mt-1">Оставьте свои контакты, и мы перезвоним вам в течение 15 минут.</p>
              </div>

              <form onSubmit={handleModalSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Ваше имя"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 outline-none"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Номер телефона"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 outline-none"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Комментарий (необязательно)"
                    rows="3"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 outline-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>
                <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition">
                  Отправить заявку
                </button>
              </form>
            </div>
          </div>
        )
      }
    </div >
  );
};

export default AgroTechApp;
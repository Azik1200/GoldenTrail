/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";

const availableLanguages = ["az", "en", "ru"];

const translations = {
  az: {
    header: {
      products: "Məhsullar",
      about: "Haqqımızda",
      contacts: "Əlaqə",
      search: "Axtarış",
      favorites: "Seçilmişlər",
      cart: "Səbət",
      account: "Hesab",
      menu: "Menyu",
    },
    footer: {
      menu: "Menyu",
      personal: "Şəxsi kabinet",
      login_registration: "Giriş/Qeydiyyat",
      cart: "Səbət",
      favorites: "Seçilmişlər",
      about: "Haqqımızda",
      development: "Sayt idarelab.az tərəfindən hazırlanıb",
    },
    hero: {
      badge: "Fərdi tikiliş. Zəmanət — 1 il.",
      title: "Tibb personalı üçün etibarlı qorunma",
      subtitle: "Kiran-dan rentgenə qarşı fartuklar, yaxalıqlar və eynəklər",
      go_to_catalog: "Kataloqa keç",
    },
    about_section: {
      title: "Haqqımızda",
      desc1:
        "Golden Trail MMC 2022-ci ildən etibarən Azərbaycanda Trivitron Healthcare Pvt Ltd şirkətinin eksklüziv distribyutorudur. Bizim missiyamız insanların sağlamlığını qorumaqdır.",
      desc2:
        "Biz MDT-in rentgenə qarşı qoruyucu geyimlərini təklif edirik ki, bu da tibbi personalı və pasiyentləri etibarlı qoruyur. Assortimentdə kişi və qadın modelləri, müxtəlif materiallar və fərdi ölçülərə uyğun tikilişlər mövcuddur.",
      desc3:
        "Həmçinin, biz tibb və kosmetologiya müəssisələri üçün dünya üzrə aparıcı istehsalçılardan birdəfəlik tibbi sərfiyyat materialları, antiseptiklər və dezinfeksiya vasitələri təqdim edirik.",
      button: "Şirkət haqqında ətraflı",
    },
    advantages: {
      title: "Məhsullarımızın üstünlükləri",
      items: [
        {
          name: "Etibarlı qorunma",
          desc: "Məhsullar müasir təhlükəsizlik standartlarına cavab verir və radiasiya, bakteriyalar və digər xarici təsirlərdən effektiv qoruyur.",
        },
        {
          name: "Geniş assortiment",
          desc: "Rentgenə qarşı qoruyucu geyimlərdən antiseptiklərə və birdəfəlik məhsullara qədər hər şey bir məkanda.",
        },
        {
          name: "Müxtəlif sahələr üçün uyğundur",
          desc: "Məhsullarımız tibb, kosmetologiya, sənaye və təhlükəsizlik xidmətlərində tələb olunur.",
        },
        {
          name: "Rahatlıq və komfort",
          desc: "Məhsullar hər detalı ilə düşünülüb: rahat kəsim, hipoallergen materiallar, asan qulluq.",
        },
      ],
    },
    popular_brands: {
      title: "Məşhur brendlər",
      desc: "Biz MDT və Trivitron Healthcare kimi etibarlı istehsalçılarla işləyirik. Bu, klinikalar və salonlar, kosmetoloji müəssisələr üçün etibarlı rentgen qoruyucu geyim və keyfiyyətli tibbi istehlak materiallarıdır.",
    },
    products_block: {
      new: "Yeniliklər",
      popular: "Məşhur məhsullar",
      choose: "Peşəkarların seçimi",
      best: "Satış hitləri",
      buy: "1 kliklə al",
      more: "Ətraflı",
      categories: "Məhsul kateqoriyaları",
    },
    wide_usage: {
      title: "Geniş tətbiq sahəsi",
      list: [
        {
          name: "Tibbi sahə:",
          menu: [
            "Tibb müəssisələri (dövlət və özəl klinikalar)",
            "Radiologiya bölmələri",
            "Stomatologiyalar",
            "Şüa terapiya mərkəzləri",
            "Baytarlıq klinikaları",
          ],
        },
        {
          name: "Kosmetologiya və gözəllik sənayesi:",
          menu: [
            "Kosmetoloji klinikalar",
            "Estetik mərkəzlər",
            "SPA salonları",
            "Tatu salonları",
            "Lazer epilyasiya salonları",
          ],
        },
        {
          name: "Təhlükəsizlik xidmətləri və sənaye:",
          menu: [
            "Radiasiyaya nəzarət xidmətləri",
            "Radiasiya yayan avadanlıqları olan gömrük və logistika xidmətləri",
          ],
        },
      ],
    },
    order_easily: {
      title: "Asan sifariş edin",
      subtitle: "Müraciətinizi göndərin, tezliklə sizinlə əlaqə saxlayaq",
      name: "Ad",
      phone: "Telefon",
      email: "E-mail",
      message: "Mesaj",
      send: "Göndərmək",
    },
    reviews: {
      title: "Müştərilər haqqımızda nə deyir",
      slide_hint: "Bütün rəylərə baxmaq üçün sürüşdürün",
      show_more: "Tam oxu",
      hide: "Gizlət",
    },
    error_page: {
      title: "Səhifə tapılmadı",
      description:
        "Təəssüf ki, istədiyiniz səhifə mövcud deyil və ya silinib. Əsas səhifəyə qayıdın və ya naviqasiya menyusundan istifadə edin.",
      back_home: "Əsas səhifə",
    },
    personal: {
      title: "Şəxsi kabinet",
      logout: "Çıxış",
      cart: "Səbət",
      favorites: "Seçilmişlər",
      orders: "Sifarişlərim",
      data: "Şəxsi məlumatlar",
    },
    categories: {
      xr: "Rentgenə qarşı geyim",
      disposable: "Bir dəfəlik məhsullar",
      antiseptics: "Antiseptiklər və dezinfeksiya",
    },
    busket: {
      empty_cart: "Səbətiniz boşdur",
      favorites_empty: "Seçilmişlər siyahısı boşdur",
      go_to_catalog: "Kataloqa keç",
      size: "Ölçü",
      color: "Rəng",
      quantity: "Say",
      delete: "Sil",
      discount: "Endirim",
      total: "Cəmi",
      no_delivery: "Çatdırılma xərci daxil deyil",
      one_click: "1 kliklə al",
      pay_delivery_info:
        "Ödəniş və çatdırılma üsullarını sifariş zamanı seçə bilərsiniz.",
      add_to_cart: "Səbətə əlavə et",
      add_all_to_cart: "Hamısını səbətə əlavə et",
      clear_favorites: "Seçilmişləri təmizlə",
    },
    personal_data: {
      hello: "Salam",
      guest: "Qonaq",
      change_password: "Şifrəni dəyiş",
      save_changes: "Dəyişiklikləri yadda saxla",
      address: "Çatdırılma ünvanı",
      placeholders: {
        name: "Ad",
        surname: "Soyad",
        patronymic: "Ata adı",
        phone: "Telefon",
        email: "Email",
        password: "Şifrə",
        city: "Şəhər/Qəsəbə",
        street: "Küçə",
        building: "Ev/Bina",
        apartment: "Mənzil/Ofis",
        postalCode: "Poçt indeksi",
      },
      errors: {
        name: "Adı daxil edin",
        surname: "Soyadı daxil edin",
        email: "Email daxil edin",
        phone: "Telefon nömrəsini daxil edin",
        password: "Şifrəni daxil edin",
      },
      saved: "Məlumatlar yadda saxlanıldı!",
    },
    orders_page: {
      title: "Sifarişlərim",
      order_number: "Sifariş nömrəsi",
      from: "tarix",
      paid: "Ödənilib",
      cancelled: "Ləğv edilib",
      delivered: "Çatdırılıb",
      color: "Rəng",
      size: "Ölçü",
      quantity: "Say",
      copied: "Kopyalandı",
    },
    product_page: {
      in_stock: "Stokda",
      guarantee: "2 il zəmanət",
      description: "Təsvir",
      loading: "Yüklənir...",
      product_not_selected: "Məhsul seçilməyib",
    },
    auth: {
      login_reg: {
        login: "Giriş",
        registration: "Qeydiyyat",
        email: "E-mail",
        password: "Şifrə",
        username: "İstifadəçi adı",
        enter_password: "Şifrəni daxil edin",
        repeat_password: "Şifrəni təkrar edin",
        login_button: "Daxil ol",
        forgot_password: "Şifrəni unutmusunuz?",
        register_button: "Qeydiyyatdan keç",
        already_login: "Artıq hesabınız var? Daxil ol",
      },
      password_recovery: {
        title: "Şifrəni bərpa et",
        new_password: "Yeni şifrə",
        email_or_phone: "E-mail və ya telefon",
        recover: "Bərpa et",
        sending: "Göndərilir...",
        sent1: "E-poçtunuza təlimat göndərdik",
        sent2: "Şifrəni bərpa etmək üçün onlara əməl edin",
      },
      change_password: {
        title: "Şifrəni dəyiş",
        new_password: "Yeni şifrə",
        confirm_password: "Şifrəni təsdiqləyin",
        change: "Dəyiş",
        sending: "Göndərilir...",
        success: "Şifrə uğurla dəyişdirildi!",
        to_home: "Əsas səhifə",
      },
      buy_modal: {
        title: "1 kliklə al",
        desc: "Əlaqə məlumatlarınızı göndərin — təsdiq və dəqiqləşdirmə üçün əlaqə saxlayacağıq.",
        name: "Ad*",
        phone: "+994-__-___-__-__",
        email: "E-mail*",
        comment: "Sifarişə şərh",
        agree:
          "Şəxsi məlumatların işlənməsinə və ictimai təklif şərtlərinə razıyam",
        submit: "Göndər",
      },
    },
  },
  en: {
    header: {
      products: "Products",
      about: "About us",
      contacts: "Contacts",
      search: "Search",
      favorites: "Favorites",
      cart: "Cart",
      account: "Account",
      menu: "Menu",
    },
    footer: {
      menu: "Menu",
      personal: "Personal account",
      login_registration: "Login/Registration",
      cart: "Cart",
      favorites: "Favorites",
      about: "About us",
      development: "Website by idarelab.az",
    },
    hero: {
      badge: "Custom tailoring. 1-year warranty.",
      title: "Reliable protection for medical staff",
      subtitle: "X-ray aprons, collars and glasses from Kiran",
      go_to_catalog: "Go to catalog",
    },
    about_section: {
      title: "About us",
      desc1:
        "Since 2022 Golden Trail LLC has been the exclusive distributor of Trivitron Healthcare Pvt Ltd in Azerbaijan. Our mission is to protect people's health.",
      desc2:
        "We offer MDT X-ray protective clothing that reliably protects medical staff and patients. The range includes men's and women's models, various materials and tailoring to individual measurements.",
      desc3:
        "We also supply disposable medical consumables, antiseptics and disinfectants from leading global manufacturers for medical and cosmetology institutions.",
      button: "More about the company",
    },
    advantages: {
      title: "Advantages of our products",
      items: [
        {
          name: "Reliable protection",
          desc: "The products meet modern safety standards and effectively protect from radiation, bacteria and other external factors.",
        },
        {
          name: "Wide range",
          desc: "From X-ray protective clothing to antiseptics and disposable products—all in one place.",
        },
        {
          name: "Suitable for various fields",
          desc: "Our products are in demand in medicine, cosmetology, industry and security services.",
        },
        {
          name: "Convenience and comfort",
          desc: "The products are thought out to details: comfortable cut, hypoallergenic materials, easy care.",
        },
      ],
    },
    popular_brands: {
      title: "Popular brands",
      desc: "We work with trusted manufacturers such as MDT and Trivitron Healthcare. They provide reliable X-ray protective clothing and quality medical consumables for clinics, salons and cosmetology institutions.",
    },
    products_block: {
      new: "New arrivals",
      popular: "Popular items",
      choose: "Professionals' choice",
      best: "Best sellers",
      buy: "Buy in 1 click",
      more: "More details",
      categories: "Product categories",
    },
    wide_usage: {
      title: "Wide application",
      list: [
        {
          name: "Medical field:",
          menu: [
            "Medical institutions (public and private clinics)",
            "Radiology departments",
            "Dental clinics",
            "Radiation therapy centers",
            "Veterinary clinics",
          ],
        },
        {
          name: "Cosmetology and beauty industry:",
          menu: [
            "Cosmetology clinics",
            "Aesthetic centers",
            "SPA salons",
            "Tattoo salons",
            "Laser hair removal salons",
          ],
        },
        {
          name: "Security services and industry:",
          menu: [
            "Radiation control services",
            "Customs and logistics services with radiation-emitting equipment",
          ],
        },
      ],
    },
    order_easily: {
      title: "Order easily",
      subtitle: "Leave a request and we will contact you shortly",
      name: "Name",
      phone: "Phone",
      email: "E-mail",
      message: "Message",
      send: "Send",
    },
    reviews: {
      title: "What our clients say about us",
      slide_hint: "Swipe to see all reviews",
      show_more: "Read more",
      hide: "Hide",
    },
    error_page: {
      title: "Page not found",
      description:
        "Unfortunately, the requested page does not exist or has been removed. Return to the homepage or use the navigation menu.",
      back_home: "Home",
    },
    personal: {
      title: "Personal account",
      logout: "Logout",
      cart: "Cart",
      favorites: "Favorites",
      orders: "My orders",
      data: "Personal data",
    },
    categories: {
      xr: "X-ray protective clothing",
      disposable: "Disposable products",
      antiseptics: "Antiseptics and disinfection",
    },
    busket: {
      empty_cart: "Your cart is empty",
      favorites_empty: "Favorites list is empty",
      go_to_catalog: "Go to catalog",
      size: "Size",
      color: "Color",
      quantity: "Quantity",
      delete: "Delete",
      discount: "Discount",
      total: "Total",
      no_delivery: "Shipping not included",
      one_click: "Buy in 1 click",
      pay_delivery_info:
        "Available payment and delivery methods can be chosen when ordering.",
      add_to_cart: "Add to cart",
      add_all_to_cart: "Add all to cart",
      clear_favorites: "Clear favorites",
    },
    personal_data: {
      hello: "Hello",
      guest: "Guest",
      change_password: "Change password",
      save_changes: "Save changes",
      address: "Delivery address",
      placeholders: {
        name: "Name",
        surname: "Surname",
        patronymic: "Patronymic",
        phone: "Phone number",
        email: "Email",
        password: "Password",
        city: "City/Locality",
        street: "Street",
        building: "Building",
        apartment: "Apartment/Office",
        postalCode: "Postal code",
      },
      errors: {
        name: "Enter name",
        surname: "Enter surname",
        email: "Enter email",
        phone: "Enter phone number",
        password: "Enter password",
      },
      saved: "Data saved!",
    },
    orders_page: {
      title: "My orders",
      order_number: "Order number",
      from: "from",
      paid: "Paid",
      cancelled: "Cancelled",
      delivered: "Delivered",
      color: "Color",
      size: "Size",
      quantity: "Quantity",
      copied: "Copied",
    },
    product_page: {
      in_stock: "In stock",
      guarantee: "2-year warranty",
      description: "Description",
      loading: "Loading...",
      product_not_selected: "Product not selected",
    },
    auth: {
      login_reg: {
        login: "Login",
        registration: "Registration",
        email: "E-mail",
        password: "Password",
        username: "Username",
        enter_password: "Enter password",
        repeat_password: "Repeat password",
        login_button: "Login",
        forgot_password: "Forgot password?",
        register_button: "Register",
        already_login: "Already have an account? Login",
      },
      password_recovery: {
        title: "Password recovery",
        new_password: "New password",
        email_or_phone: "Email or phone",
        recover: "Recover",
        sending: "Sending...",
        sent1: "We have sent you instructions to your email",
        sent2: "Follow them to recover your password",
      },
      change_password: {
        title: "Change password",
        new_password: "New password",
        confirm_password: "Confirm password",
        change: "Change",
        sending: "Sending...",
        success: "Password successfully changed!",
        to_home: "Home",
      },
      buy_modal: {
        title: "Buy in 1 click",
        desc: "Leave your contact details — we will contact you for confirmation and details.",
        name: "Name*",
        phone: "+994-__-___-__-__",
        email: "E-mail*",
        comment: "Order comment",
        agree:
          "I agree to the processing of personal data and the terms of the public offer",
        submit: "Submit",
      },
    },
  },
  ru: {
    header: {
      products: "Продукция",
      about: "О нас",
      contacts: "Контакты",
      search: "Поиск",
      favorites: "Избранное",
      cart: "Корзина",
      account: "Аккаунт",
      menu: "Меню",
    },
    footer: {
      menu: "Меню",
      personal: "Личный кабинет",
      login_registration: "Вход/Регистрация",
      cart: "Корзина",
      favorites: "Избранное",
      about: "О нас",
      development: "Разработка сайта idarelab.az",
    },
    hero: {
      badge: "Индивидуальный пошив. Гарантия — 1 год.",
      title: "Надёжная защита для медперсонала",
      subtitle: "Рентгенозащитные фартуки, воротники и очки от Kiran",
      go_to_catalog: "Перейти в каталог",
    },
    about_section: {
      title: "О нас",
      desc1:
        "Компания Golden Trail MMC с 2022 года является эксклюзивным дистрибьютором Trivitron Healthcare Pvt Ltd в Азербайджане. Наша миссия — защита здоровья людей.",
      desc2:
        "Мы предлагаем рентгенозащитную одежду MDT, которая обеспечивает надёжную защиту медицинского персонала и пациентов. В ассортименте — мужские и женские модели, различные материалы и пошив по индивидуальным меркам.",
      desc3:
        "Также мы поставляем одноразовые медицинские расходные материалы, антисептики и дезинфицирующие средства от ведущих мировых производителей для медицинских и косметологических учреждений.",
      button: "Подробнее о компании",
    },
    advantages: {
      title: "Преимущества нашей продукции",
      items: [
        {
          name: "Надёжная защита",
          desc: "Продукция отвечает современным стандартам безопасности и эффективно защищает от воздействия радиации, бактерий и других внешних факторов.",
        },
        {
          name: "Широкий ассортимент",
          desc: "От рентгенозащитной одежды до антисептиков и одноразовой продукции — всё в одном месте.",
        },
        {
          name: "Подходит для разных сфер",
          desc: "Наши товары востребованы в медицине, косметологии, промышленности и службах безопасности.",
        },
        {
          name: "Удобство и комфорт",
          desc: "Продукция продумана до мелочей: удобный крой, гипоаллергенные материалы, простой уход.",
        },
      ],
    },
    popular_brands: {
      title: "Популярные бренды",
      desc: "Мы работаем с проверенными производителями, такими как MDT и Trivitron Healthcare. Это надёжная рентгенозащитная одежда и качественные медицинские расходники для клиник и салонов, косметологических учреждений.",
    },
    products_block: {
      new: "Новинки",
      popular: "Популярные товары",
      choose: "Выбор профессионалов",
      best: "Хиты продаж",
      buy: "Купить в 1 клик",
      more: "Подробнее",
      categories: "Категории товаров",
    },
    wide_usage: {
      title: "Широкая сфера применения",
      list: [
        {
          name: "Медицинская сфера:",
          menu: [
            "Медицинские учреждения (государственные и частные клиники)",
            "Радиологические отделения",
            "Стоматологии",
            "Центры лучевой терапии",
            "Ветеринарные клиники",
          ],
        },
        {
          name: "Косметология и бьюти-индустрия:",
          menu: [
            "Косметологические клиники",
            "Эстетические центры",
            "SPA-салоны",
            "Тату-салоны",
            "Салоны лазерной эпиляции",
          ],
        },
        {
          name: "Службы безопасности и промышленность:",
          menu: [
            "Службы радиационного контроля",
            "Таможенные и логистические службы с оборудованием, излучающим радиацию",
          ],
        },
      ],
    },
    order_easily: {
      title: "Закажите легко",
      subtitle: "Оставьте заявку и мы свяжемся с вами в ближайшее время",
      name: "Имя",
      phone: "Телефон",
      email: "E-mail",
      message: "Сообщение",
      send: "Отправить",
    },
    reviews: {
      title: "Что о нас говорят клиенты",
      slide_hint: "Листайте чтобы посмотреть все отзывы",
      show_more: "Читать полностью",
      hide: "Скрыть",
    },
    error_page: {
      title: "Страница не найдена",
      description:
        "К сожалению, запрашиваемая страница не существует или была удалена. Вернитесь на главную или воспользуйтесь меню навигации.",
      back_home: "На главную",
    },
    personal: {
      title: "Личный кабинет",
      logout: "Выйти",
      cart: "Корзина",
      favorites: "Избранное",
      orders: "Мои заказы",
      data: "Персональные данные",
    },
    categories: {
      xr: "Рентгенозащитная одежда",
      disposable: "Одноразовая продукция",
      antiseptics: "Антисептики и дезинфекция",
    },
    busket: {
      empty_cart: "Ваша корзина пуста",
      favorites_empty: "В избранном пока ничего нет",
      go_to_catalog: "Перейти в каталог",
      size: "Размер",
      color: "Цвет",
      quantity: "Количество",
      delete: "Удалить",
      discount: "Скидка",
      total: "Итого",
      no_delivery: "Без учета стоимости доставки",
      one_click: "Купить в 1 клик",
      pay_delivery_info:
        "Доступные способы оплаты и доставки можно выбрать при оформлении заказа.",
      add_to_cart: "Добавить в корзину",
      add_all_to_cart: "Добавить все в корзину",
      clear_favorites: "Очистить избранное",
    },
    personal_data: {
      hello: "Здравствуйте",
      guest: "Гость",
      change_password: "Изменить пароль",
      save_changes: "Сохранить изменения",
      address: "Адрес доставки",
      placeholders: {
        name: "Имя",
        surname: "Фамилия",
        patronymic: "Отчество",
        phone: "Номер телефона",
        email: "Email",
        password: "Пароль",
        city: "Город/Населенный пункт",
        street: "Улица",
        building: "Дом/Строение",
        apartment: "Квартира/Офис",
        postalCode: "Почтовый индекс",
      },
      errors: {
        name: "Введите имя",
        surname: "Введите фамилию",
        email: "Введите email",
        phone: "Введите номер телефона",
        password: "Введите пароль",
      },
      saved: "Данные сохранены!",
    },
    orders_page: {
      title: "Мои заказы",
      order_number: "Заказ номер",
      from: "от",
      paid: "Оплачен",
      cancelled: "Отменен",
      delivered: "Доставлен",
      color: "Цвет",
      size: "Размер",
      quantity: "Количество",
      copied: "Скопировано",
    },
    product_page: {
      in_stock: "В наличии",
      guarantee: "Гарантия 2 года",
      description: "Описание",
      loading: "Загрузка...",
      product_not_selected: "Товар не выбран",
    },
    auth: {
      login_reg: {
        login: "Вход",
        registration: "Регистрация",
        email: "E-mail",
        password: "Пароль",
        username: "Имя пользователя",
        enter_password: "Введите пароль",
        repeat_password: "Повторите пароль",
        login_button: "Войти",
        forgot_password: "Забыли пароль?",
        register_button: "Зарегистрироваться",
        already_login: "Уже есть аккаунт? Войти",
      },
      password_recovery: {
        title: "Восстановление пароля",
        new_password: "Новый пароль",
        email_or_phone: "E-mail или телефон",
        recover: "Восстановить",
        sending: "Отправка...",
        sent1: "Мы отправили вам письмо-инструкцию на ваш email",
        sent2: "Следуйте им, чтобы восстановить пароль",
      },
      change_password: {
        title: "Изменение пароля",
        new_password: "Новый пароль",
        confirm_password: "Подтвердите пароль",
        change: "Изменить",
        sending: "Отправка...",
        success: "Ваш пароль успешно изменен!",
        to_home: "На главную",
      },
      buy_modal: {
        title: "Купить в 1 клик",
        desc: "Оставьте контактные данные — мы свяжемся с вами для подтверждения и уточнения деталей.",
        name: "Имя*",
        phone: "+994-__-___-__-__",
        email: "E-mail*",
        comment: "Комментарий к заказу",
        agree:
          "Соглашаюсь на обработку персональных данных и с условиями публичной оферты",
        submit: "Отправить",
      },
    },
  },
};

export const LanguageContext = createContext({
  language: "ru",
  setLanguage: () => {},
  t: (key) => key,
});

export const LanguageProvider = ({ children }) => {
  const detectBrowserLanguage = () => {
    const lang = navigator.language?.slice(0, 2).toLowerCase();
    return availableLanguages.includes(lang) ? lang : "ru";
  };

  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem("language");
    if (saved && availableLanguages.includes(saved)) return saved;
    return detectBrowserLanguage();
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const setLanguage = (lang) => {
    localStorage.setItem("language", lang);
    setLanguageState(lang);
    window.location.reload();
  };

  const t = (key) => {
    const parts = key.split(".");
    let value = translations[language];
    for (const part of parts) {
      value = value?.[part];
      if (value === undefined) break;
    }
    return value ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

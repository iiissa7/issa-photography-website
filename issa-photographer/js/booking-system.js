// نظام الحجوزات وقاعدة البيانات
class BookingSystem {
    constructor() {
        this.bookings = JSON.parse(localStorage.getItem('issaBookings')) || [];
        this.currentLanguage = localStorage.getItem('issaLanguage') || 'ar';
        this.init();
    }

    init() {
        this.loadLanguage();
        this.setupEventListeners();
        this.displayBookingsCount();
    }

    // نظام تغيير اللغة
    loadLanguage() {
        const elements = document.querySelectorAll('[data-lang]');
        elements.forEach(element => {
            const key = element.getAttribute('data-lang');
            if (this.translations[this.currentLanguage][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = this.translations[this.currentLanguage][key];
                } else {
                    element.textContent = this.translations[this.currentLanguage][key];
                }
            }
        });
        
        // تحديث اتجاه الصفحة
        document.documentElement.dir = this.currentLanguage === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = this.currentLanguage;
        
        // تحديث زر اللغة
        const langBtn = document.getElementById('languageToggle');
        if (langBtn) {
            langBtn.innerHTML = this.currentLanguage === 'ar' ? 
                '🌐 EN' : '🌐 AR';
        }
    }

    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'ar' ? 'en' : 'ar';
        localStorage.setItem('issaLanguage', this.currentLanguage);
        this.loadLanguage();
        this.updateBookingForm();
    }

    // ترجمات الموقع
    translations = {
        ar: {
            // شريط التنقل
            'nav.book': 'احجز الآن',
            'nav.phone': 'اتصل بنا',
            
            // الهيرو
            'hero.title': 'لحظات تخلد لأبد',
            'hero.subtitle': 'تصوير احترافي يعبر عن جمال سيارتك، عقارك، ومناسباتك الخاصة',
            'hero.projects': 'المشاريع',
            'hero.clients': 'العملاء', 
            'hero.experience': 'سنوات الخبرة',
            
            // الخدمات
            'services.title': 'لماذا تختارنا؟',
            'services.cars': 'تصوير السيارات الفاخرة',
            'services.cars.desc': 'تصوير احترافي يبرز جمال سيارتك الفاخرة في مواقع خلابة وإضاءة مثالية',
            'services.realestate': 'تصوير العقارات',
            'services.realestate.desc': 'إبراز جمال وجاذبية عقارك بصور احترافية تزيد من قيمته',
            'services.events': 'تصوير المناسبات',
            'services.events.desc': 'احفظ ذكريات مناسباتك السعيدة بأجمل الصور',
            
            // الحجوزات
            'booking.title': 'احجز جلسة تصوير',
            'booking.subtitle': 'املأ البيانات وسنتصل بك لتأكيد الموعد',
            'booking.name': 'الاسم الكامل',
            'booking.phone': 'رقم الهاتف',
            'booking.email': 'البريد الإلكتروني',
            'booking.service': 'نوع الخدمة',
            'booking.service.select': 'اختر نوع الخدمة',
            'booking.service.cars': 'تصوير السيارات',
            'booking.service.realestate': 'تصوير العقارات', 
            'booking.service.events': 'تصوير المناسبات',
            'booking.date': 'تاريخ الحجز',
            'booking.time': 'وقت الحجز',
            'booking.notes': 'ملاحظات إضافية',
            'booking.submit': 'تأكيد الحجز',
            'booking.success': 'تم استلام حجزك بنجاح!',
            'booking.success.message': 'سنقوم بالاتصال بك خلال 24 ساعة لتأكيد الموعد',
            
            // الدعوة للعمل
            'cta.title': 'جاهز لبدء مشروعك؟',
            'cta.subtitle': 'احجز جلسة التصوير الخاصة بك الآن واحصل على خصم 15%',
            'cta.book': 'احجز الآن ووفر 15%',
            'cta.call': 'اتصل بنا مباشرة',
            
            // التواصل
            'contact.title': 'تواصل معنا',
            'contact.subtitle': 'لديك استفسار أو تريد معرفة المزيد عن خدماتنا؟',
            'contact.whatsapp': 'راسلنا على واتساب',
            'contact.instagram': 'تابعنا على إنستغرام'
        },
        en: {
            // Navigation
            'nav.book': 'Book Now',
            'nav.phone': 'Call Us',
            
            // Hero
            'hero.title': 'Moments Last Forever',
            'hero.subtitle': 'Professional photography that expresses the beauty of your car, property, and special occasions',
            'hero.projects': 'Projects',
            'hero.clients': 'Clients',
            'hero.experience': 'Years Experience',
            
            // Services
            'services.title': 'Why Choose Us?',
            'services.cars': 'Luxury Car Photography',
            'services.cars.desc': 'Professional photography that highlights your luxury car in stunning locations',
            'services.realestate': 'Real Estate Photography', 
            'services.realestate.desc': 'Showcase your property beauty with professional photos that increase its value',
            'services.events': 'Event Photography',
            'services.events.desc': 'Preserve your happy moments with the most beautiful photos',
            
            // Booking
            'booking.title': 'Book a Photo Session',
            'booking.subtitle': 'Fill in the details and we will call you to confirm the appointment',
            'booking.name': 'Full Name',
            'booking.phone': 'Phone Number',
            'booking.email': 'Email Address',
            'booking.service': 'Service Type',
            'booking.service.select': 'Select Service Type',
            'booking.service.cars': 'Car Photography',
            'booking.service.realestate': 'Real Estate Photography',
            'booking.service.events': 'Event Photography',
            'booking.date': 'Booking Date',
            'booking.time': 'Booking Time',
            'booking.notes': 'Additional Notes',
            'booking.submit': 'Confirm Booking',
            'booking.success': 'Your booking has been received successfully!',
            'booking.success.message': 'We will contact you within 24 hours to confirm the appointment',
            
            // Call to Action
            'cta.title': 'Ready to Start Your Project?',
            'cta.subtitle': 'Book your photo session now and get 15% discount',
            'cta.book': 'Book Now & Save 15%',
            'cta.call': 'Call Us Directly',
            
            // Contact
            'contact.title': 'Contact Us',
            'contact.subtitle': 'Have a question or want to know more about our services?',
            'contact.whatsapp': 'Message us on WhatsApp',
            'contact.instagram': 'Follow us on Instagram'
        }
    };

    // إعداد أحداث النماذج
    setupEventListeners() {
        const bookingForm = document.getElementById('bookingForm');
        if (bookingForm) {
            bookingForm.addEventListener('submit', (e) => this.handleBooking(e));
        }

        const langBtn = document.getElementById('languageToggle');
        if (langBtn) {
            langBtn.addEventListener('click', () => this.toggleLanguage());
        }
    }

    // معالجة الحجز
    handleBooking(e) {
        e.preventDefault();
        
        const formData = {
            id: Date.now(),
            name: document.getElementById('clientName').value,
            phone: document.getElementById('clientPhone').value,
            email: document.getElementById('clientEmail').value,
            service: document.getElementById('serviceType').value,
            date: document.getElementById('bookingDate').value,
            time: document.getElementById('bookingTime').value,
            notes: document.getElementById('bookingNotes').value,
            status: 'pending',
            createdAt: new Date().toISOString(),
            language: this.currentLanguage
        };

        if (this.saveBooking(formData)) {
            this.sendNotification(formData);
            this.showSuccessMessage();
            this.resetForm();
            this.displayBookingsCount();
        }
    }

    // حفظ الحجز في قاعدة البيانات
    saveBooking(booking) {
        this.bookings.push(booking);
        localStorage.setItem('issaBookings', JSON.stringify(this.bookings));
        return true;
    }

    // إرسال إشعار
    sendNotification(booking) {
        const message = this.currentLanguage === 'ar' ?
            `🔔 حجز جديد 🔔\n\nالاسم: ${booking.name}\nالهاتف: ${booking.phone}\nالخدمة: ${this.getServiceName(booking.service)}\nالتاريخ: ${booking.date}\nالوقت: ${booking.time}` :
            `🔔 New Booking 🔔\n\nName: ${booking.name}\nPhone: ${booking.phone}\nService: ${this.getServiceName(booking.service)}\nDate: ${booking.date}\nTime: ${booking.time}`;

        // إشعار واتساب
        const whatsappUrl = `https://wa.me/966537476606?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');

        // إشعار متصفح
        if ("Notification" in window && Notification.permission === "granted") {
            new Notification(this.currentLanguage === 'ar' ? 'حجز جديد' : 'New Booking', {
                body: this.currentLanguage === 'ar' ? 
                    `حجز جديد من ${booking.name}` : 
                    `New booking from ${booking.name}`,
                icon: '/icon.png'
            });
        }
    }

    getServiceName(service) {
        const services = {
            'cars': this.currentLanguage === 'ar' ? 'تصوير السيارات' : 'Car Photography',
            'realestate': this.currentLanguage === 'ar' ? 'تصوير العقارات' : 'Real Estate Photography',
            'events': this.currentLanguage === 'ar' ? 'تصوير المناسبات' : 'Event Photography'
        };
        return services[service] || service;
    }

    // عرض رسالة النجاح
    showSuccessMessage() {
        const modal = document.getElementById('successModal');
        if (modal) {
            modal.style.display = 'block';
            setTimeout(() => {
                modal.style.display = 'none';
            }, 5000);
        }
    }

    // إعادة تعيين النموذج
    resetForm() {
        const form = document.getElementById('bookingForm');
        if (form) form.reset();
    }

    // عرض عدد الحجوزات (للوحة التحكم المستقبلية)
    displayBookingsCount() {
        const countElement = document.getElementById('bookingsCount');
        if (countElement) {
            countElement.textContent = this.bookings.length;
        }
    }

    // تحديث نموذج الحجوزات عند تغيير اللغة
    updateBookingForm() {
        // سيتم تحديثه تلقائياً عبر loadLanguage
    }

    // الحصول على جميع الحجوزات (للوحة التحكم)
    getAllBookings() {
        return this.bookings;
    }

    // تحديث حالة الحجز
    updateBookingStatus(bookingId, status) {
        const booking = this.bookings.find(b => b.id === bookingId);
        if (booking) {
            booking.status = status;
            localStorage.setItem('issaBookings', JSON.stringify(this.bookings));
            return true;
        }
        return false;
    }
}

// تهيئة النظام
const bookingSystem = new BookingSystem();
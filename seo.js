// Inject structured data (JSON-LD) into the DOM for SEO
(function() {
    'use strict';

    // Organization Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "HomeTown TechHub",
      "alternateName": "Hometown Tech Hub",
      "url": "https://techhub.com",
      "logo": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=200&fit=crop",
      "description": "Leading IT solutions provider with 5+ years experience delivering innovative technologies and exceptional services.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Tech Street",
        "addressLocality": "Silicon Valley",
        "addressRegion": "CA",
        "postalCode": "94025",
        "addressCountry": "US"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-234-567-890",
        "contactType": "customer service"
      },
      "sameAs": [
        "https://facebook.com/techhub",
        "https://twitter.com/techhub",
        "https://instagram.com/techhub"
      ]
    };

    // Website Search Schema
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "HomeTown TechHub",
      "url": "https://techhub.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://techhub.com/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    };

    // Course Schemas for courses.html
    const coursesSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "HomeTown TechHub Courses",
      "description": "Comprehensive training programs in data analytics, web development, SEO, product design, and digital marketing",
      "numberOfItems": 6,
      "itemListElement": [
        {
          "@type": "Course",
          "position": 1,
          "name": "Data Analytics",
          "description": "Learn to transform raw data into actionable insights. Master Python, SQL, Tableau, and advanced analytics techniques.",
          "provider": {
            "@type": "Organization",
            "name": "HomeTown TechHub"
          },
          "duration": "P12W",
          "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
        },
        {
          "@type": "Course",
          "position": 2,
          "name": "Web Development",
          "description": "Master frontend web development from scratch. Learn HTML, CSS, JavaScript, React, and modern frameworks.",
          "provider": {
            "@type": "Organization",
            "name": "HomeTown TechHub"
          },
          "duration": "P16W",
          "image": "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=400&fit=crop"
        },
        {
          "@type": "Course",
          "position": 3,
          "name": "SEO Optimization",
          "description": "Improve online visibility and drive organic traffic with proven SEO strategies and techniques.",
          "provider": {
            "@type": "Organization",
            "name": "HomeTown TechHub"
          },
          "duration": "P8W",
          "image": "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&h=400&fit=crop"
        },
        {
          "@type": "Course",
          "position": 4,
          "name": "Product Design",
          "description": "Create beautiful and intuitive product interfaces with UX/UI design expertise and modern design principles.",
          "provider": {
            "@type": "Organization",
            "name": "HomeTown TechHub"
          },
          "duration": "P10W",
          "image": "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop"
        },
        {
          "@type": "Course",
          "position": 5,
          "name": "Social Media Marketing",
          "description": "Amplify your brand presence across social platforms with strategic marketing campaigns and engaging content.",
          "provider": {
            "@type": "Organization",
            "name": "HomeTown TechHub"
          },
          "duration": "P8W",
          "image": "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop"
        },
        {
          "@type": "Course",
          "position": 6,
          "name": "Content Writing",
          "description": "Engage your audience with compelling and SEO-optimized content crafted by skilled professional writers.",
          "provider": {
            "@type": "Organization",
            "name": "HomeTown TechHub"
          },
          "duration": "P6W",
          "image": "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop"
        }
      ]
    };

    // AboutPage Schema for about.html
    const aboutPageSchema = {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "mainEntity": {
        "@type": "Organization",
        "name": "HomeTown TechHub",
        "description": "HomeTown TechHub provides innovative and reliable IT solutions tailored to meet your business needs with 5+ years of experience.",
        "founder": {
          "@type": "Person",
          "name": "TechHub Team"
        },
        "foundingDate": "2019",
        "numberOfEmployees": {
          "@type": "QuantitativeValue",
          "minValue": 10,
          "maxValue": 50
        },
        "areaServed": "Worldwide",
        "knowsAbout": [
          "Web Development",
          "Data Analytics",
          "SEO Optimization",
          "Product Design",
          "Social Media Marketing",
          "Content Writing"
        ]
      }
    };

    // ContactPage Schema for contact.html
    const contactPageSchema = {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "mainEntity": {
        "@type": "Organization",
        "name": "HomeTown TechHub",
        "url": "https://techhub.com",
        "telephone": "+1-234-567-890",
        "email": "info@techhub.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "123 Tech Street",
          "addressLocality": "Silicon Valley",
          "addressRegion": "CA",
          "postalCode": "94025",
          "addressCountry": "US"
        },
        "openingHours": "Mo-Fr 09:00-18:00"
      }
    };

    // Determine which page we're on and inject appropriate schemas
    function injectSchemas() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';

        // Always inject organization and website schemas (base schemas)
        createAndInsertSchema(organizationSchema);
        createAndInsertSchema(websiteSchema);

        // Page-specific schemas
        if (filename === 'about.html' || filename.includes('about')) {
            createAndInsertSchema(aboutPageSchema);
        } else if (filename === 'courses.html' || filename.includes('courses')) {
            createAndInsertSchema(coursesSchema);
        } else if (filename === 'contact.html' || filename.includes('contact')) {
            createAndInsertSchema(contactPageSchema);
        }
        // index.html gets only base schemas
    }

    // Create script element with JSON-LD schema
    function createAndInsertSchema(schema) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schema);
        document.head.appendChild(script);
    }

    // Initialize after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectSchemas);
    } else {
        injectSchemas();
    }
})();

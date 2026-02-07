import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import emailjs from '@emailjs/browser';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useToast } from '@/hooks/use-toast';
import PageTransition from '@/components/PageTransition';

const services = [
  'Branding',
  'Web Design',
  'Development',
  'E-commerce',
  'Marketing',
  'Other',
];

export default function Contact() {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // ONE COMMON PAYLOAD
    const payload = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      service: formData.service,
      message: formData.message,
      date: new Date().toLocaleString(),

      // auto-reply only
      to_name: formData.name,
      to_email: formData.email,
    };

    try {
      // 1️⃣ SEND TO YOUR TEAM
      await emailjs.send(
        'service_b5ina3g',
        'template_2720vxi',
        payload,
        'lrW3JHNHD3g3Yal8K'
      );

      // 2️⃣ AUTO-REPLY TO CLIENT
      await emailjs.send(
        'service_b5ina3g',
        'template_auto_reply',
        payload,
        'lrW3JHNHD3g3Yal8K'
      );

      toast({
        title: 'Message sent!',
        description: 'We have received your message.',
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });

    } catch (error) {
      console.error('EmailJS Error:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-20">
          <section className="section-padding">
            <div className="container-wide">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                {/* LEFT */}
                <div>
                  <h1 className="text-5xl font-bold mb-6">
                    Contact <span className="gradient-text">Promocraft</span>
                  </h1>
                  <p className="text-muted-foreground mb-10">
                    Fill out the form and we’ll contact you shortly.
                  </p>

                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <Mail /> promocraftofficial@gmail.com
                    </div>
                    <div className="flex gap-3">
                      <Phone /> +91 8714 1452 52
                    </div>
                    <div className="flex gap-3">
                      <MapPin /> Calicut, Kerala
                    </div>
                  </div>
                </div>

                {/* FORM */}
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <input
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full p-4 rounded-xl border bg-secondary"
                  />

                  <input
                    required
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full p-4 rounded-xl border bg-secondary"
                  />

                  <input
                    required
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full p-4 rounded-xl border bg-secondary"
                  />

                  <select
                    required
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                    className="w-full p-4 rounded-xl border bg-secondary"
                  >
                    <option value="">Select a service</option>
                    {services.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>

                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full p-4 rounded-xl border bg-secondary"
                  />

                  <motion.button
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-hero"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send className="inline ml-2 w-5 h-5" />
                  </motion.button>
                </motion.form>

              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}

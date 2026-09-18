CREATE TABLE public.site_settings (
  key text PRIMARY KEY,
  value text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY site_settings_public_read ON public.site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.site_settings (key, value) VALUES
  ('whatsapp_number', '962788757801'),
  ('hero_line1', 'أنظمة حماية متطورة'),
  ('hero_line2', 'لأمان عائلتك وعملك'),
  ('packages_title', 'حماية موثوقة، بسعر واضح'),
  ('packages_text', 'اختر الدقة التي تناسبك. جميع الباقات تشمل الأجهزة الأصلية والتركيب والبرمجة الكاملة.'),
  ('calc_base_2mp', '60'),
  ('calc_unit_2mp', '35'),
  ('calc_base_5mp', '64'),
  ('calc_unit_5mp', '45'),
  ('calc_base_4k', '150'),
  ('calc_unit_4k', '80'),
  ('calc_alarm', '185');
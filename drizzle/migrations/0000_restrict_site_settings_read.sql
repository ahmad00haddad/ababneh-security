DROP POLICY IF EXISTS site_settings_public_read ON public.site_settings;
CREATE POLICY site_settings_public_read ON public.site_settings FOR SELECT TO anon, authenticated
USING (key IN ('whatsapp_number','hero_line1','hero_line2','packages_title','packages_text','calc_base_2mp','calc_unit_2mp','calc_base_5mp','calc_unit_5mp','calc_base_4k','calc_unit_4k','calc_alarm'));
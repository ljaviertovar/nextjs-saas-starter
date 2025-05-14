import ContentSection from '../components/content-sections'
import ProfileForm from './profile-form'

export default function SettingsProfile() {
	return (
		<ContentSection title='Profile' desc='This is how others will see you on the site.'>
			<ProfileForm />
		</ContentSection>
	)
}

import Link from 'next/link'
import Header from '@/components/header'
import Text from '@/components/text'
import styles from './page.module.scss'

const HomePage = () => {
	return (
		<main className={styles.home}>
			<Header>Home</Header>
			<Link href='/transactions'>
				<Text
					variant='body-1'
					className={styles.home__link}
				>
					Go Transaction page
				</Text>
			</Link>
		</main>
	)
}

export default HomePage

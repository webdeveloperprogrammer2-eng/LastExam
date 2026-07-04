import { Button } from '@mui/material'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'

export default function Home6() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  return (
    <>
    <div className='max-w-[1200px] m-auto flex justify-center p-[10px]'>
      <Button onClick={() => navigate('Catalog')} sx={{backgroundColor : "#287FE8", marginTop : '10px', width : '200px'}} variant="contained">{t('home6.showMore')}</Button> 
    </div>
    </>
  )
}

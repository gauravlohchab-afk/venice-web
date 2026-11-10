import { useParams } from 'react-router-dom'
import { ConsultBand } from '../components/ui/ConsultBand'
import { findTreatment } from '../data/treatments'
import NotFound from './NotFound'
import { TreatmentLayout } from './treatment/TreatmentLayout'
import { MoreTreatments } from './treatment/shared'

export default function Treatment() {
  const { slug } = useParams()
  const t = findTreatment(slug)
  if (!t) return <NotFound />
  return (
    <>
      <TreatmentLayout t={t} />
      <MoreTreatments t={t} />
      <ConsultBand treatment={t.name} />
    </>
  )
}

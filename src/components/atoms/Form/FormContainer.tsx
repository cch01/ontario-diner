import { faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Hr } from 'components/atoms/Hr'

interface FormContainerProps {
  title: string
  children: React.ReactNode
  onClearSection?: () => void
}
export const FormContainer: React.FC<FormContainerProps> = ({
  title,
  onClearSection,
  children
}) => {
  return (
    <div className="flex flex-col rounded-md border border-border p-2 ">
      <div className="flex w-full flex-row items-center justify-between">
        <div className="text-lg font-bold text-primary">{title}</div>
        {onClearSection && (
          <div role="button" onClick={onClearSection}>
            <FontAwesomeIcon
              className="text-sm text-highlight"
              icon={faArrowRotateLeft}
            />
          </div>
        )}
      </div>
      <Hr className="mb-2" />
      {children}
    </div>
  )
}

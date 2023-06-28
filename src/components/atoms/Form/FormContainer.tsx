import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Hr } from 'components/atoms/Hr'

interface FormContainerProps {
  title: string
  children: React.ReactNode
  onRemove?: () => void
}
export const FormContainer: React.FC<FormContainerProps> = ({
  title,
  onRemove,
  children
}) => {
  return (
    <div className="flex flex-col rounded-md border border-border p-2 ">
      <div className="flex w-full flex-row items-center justify-between">
        <div className="text-lg font-bold text-primary">{title}</div>
        {onRemove && (
          <FontAwesomeIcon
            className="mb-1 text-lg text-highlight"
            icon={faTrashAlt}
          />
        )}
      </div>
      <Hr className="mb-2" />
      {children}
    </div>
  )
}


type Props = { onClick: () => void };


export default function ShowUsersButton( {onClick }: Props) {
    return (
        <button 
            onClick={onClick}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Show Users
        </button>

    )  
}
import { UserButton } from "@clerk/nextjs";

export default function StickyNote({name}){
  return(
    <div className="sticky-note-container text-center">
    <div className="sticky-note-text">
      <h2>
        {name}'s Board{" "}
        <div className="user-button">
          <UserButton />
        </div>
      </h2>
    </div>
    <img src="/sticky-note.png" alt="Sticky Note" />
  </div>
  )
}
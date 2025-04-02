import { useState } from "react"
import Title from "../../../src/components/Title"
import LinkButton from "../LinkButton"
import ProfileSection from "./ProfileSection"
import styles from "./styles.module.css"

export default function Profile(props) {
  const [followText, setFollowText] = useState("Seguir")
  
  function followClick(ev) {
    followText == "Seguir" ? setFollowText("Seguindo") : setFollowText("Seguir")
  }
  return (
    <div className={styles.container}>
      <img className={styles.avatar} src={props.avatar} alt="Foto de Perfil" />
      <Title>
        <span>{props.name}</span>
        <button
          className={styles.followButton}
          onClick={followClick}
        >
          {followText}
        </button>
      </Title>
      <ProfileSection><p>{props.bio}</p></ProfileSection>
      <ProfileSection><p>{props.phone}</p></ProfileSection>
      <ProfileSection><p>{props.email}</p></ProfileSection>
      <ProfileSection
        className={styles.links}
        id="links-section"
        data-test="Some Value"
        aria-label="Social Links"
      >
        <LinkButton href={props.githubUrl}>GitHub</LinkButton>
        <LinkButton href={props.linkedinUrl}>LinkedIn</LinkButton>
        <LinkButton href={props.twitterUrl}>Twitter</LinkButton>
      </ProfileSection>
    </div>
  )
}
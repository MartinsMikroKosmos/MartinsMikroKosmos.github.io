import React from 'react'

class GruppeBearbeitenTag extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      newName: this.props.gruppe.name
    }
  }

  /**
   * Reagiert auf Änderungen im Eingabefeld und speichert den neuen Wert im newName-state
   * @param {Event.CHANGE} event - das Change-Event im Eingabefeld
   */
  handleChange(event) {
    let gruppenName = event.target.value
    this.setState({newName: gruppenName})
  }

  /**
   * Reagiert auf Änderungen im Eingabefeld und speichert den neuen Wert der Gruppe
   * @param {gruppe} gruppe - die umzubenennende Gruppe
   * @param {event} event - lässt den Namen eintippen
   */
  gruppeUmbenennen(gruppe, event) {
    if (event && event.key != "Enter") return
    Modell.gruppeUmbenennen(gruppe.name, this.state.newName)
    this.setState({isEditing: false})
  }

  render() {
    const gruppe = this.props.gruppe

    const viewTemplate = (
      <dt>
        <span>{gruppe.name}</span>
        <i className="material-icons"
           onClick={() => this.setState({isEditing: true})}>
          drive_file_rename_outline</i>
        <i className="material-icons"
           onClick={this.props.entfernenHandler}>delete</i>
      </dt>
    )
    const editTemplate = (
      <dt>
        <input type="search" value={this.state.newName} autoFocus={true}
               onChange={event => this.handleChange(event)}
               onKeyPress={event => this.gruppeUmbenennen(gruppe, event)}/>
        <i className="material-icons"
           onClick={() => this.setState({isEditing: false})}>cancel </i>
        <i className="material-icons"
           onClick={() => this.gruppeUmbenennen(gruppe)}>check_circle </i>
      </dt>
    )

    return (
      this.state.isEditing
        ? editTemplate
        : viewTemplate
    )
  }
}

export default GruppeBearbeitenTag

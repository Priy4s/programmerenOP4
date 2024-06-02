import { ImageSource, Sound, Resource, Loader, ImageWrapping } from 'excalibur'
import { Background } from './background'
import { Shield } from './shield'

const Resources = {
    CrowUp: new ImageSource('images/crow_1.png'),
    CrowDown: new ImageSource('images/crow_2.png'),
    Player: new ImageSource('images/ghost.png'),
    Cloud: new ImageSource('images/cloud.png'),
    Broom: new ImageSource('images/broom.png'),
    Shield: new ImageSource('images/obstacle.png'),
    Heart: new ImageSource('images/heart.png'),
    GhostShield: new ImageSource('images/ghostShield.png'),
    Background: new ImageSource('images/background.png', { wrapping: ImageWrapping.Repeat }),

}
const ResourceLoader = new Loader([
    Resources.CrowUp,
    Resources.CrowDown,
    Resources.Player,
    Resources.Cloud,
    Resources.Broom,
    Resources.Shield,
    Resources.Heart,
    Resources.GhostShield,
    Resources.Background
])


export { Resources, ResourceLoader }
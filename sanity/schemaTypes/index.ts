import { authorType } from './authorType'
import { blogPostType } from './blogPostType'
import { categoryType } from './categoryType'
import { packageType } from './packageType'
import { pageType } from './pageType'
import { serviceType } from './serviceType'
import { settingsType } from './settingsType'
import { mediaType } from './mediaType'

export const schema = {
  types: [authorType, blogPostType, categoryType, packageType, pageType, serviceType, settingsType, mediaType],
}

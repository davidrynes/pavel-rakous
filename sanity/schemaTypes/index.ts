import { authorType } from './authorType'
import { blogPostType } from './blogPostType'
import { categoryType } from './categoryType'
import { packageType } from './packageType'
import { pageType } from './pageType'
import { serviceType } from './serviceType'
import { settingsType } from './settingsType'
import { mediaType } from './mediaType'
import { testimonialType } from './testimonialType'
import { seminarType } from './seminarType'

export const schema = {
  types: [
    authorType,
    blogPostType,
    categoryType,
    packageType,
    pageType,
    serviceType,
    settingsType,
    mediaType,
    testimonialType,
    seminarType,
  ],
}

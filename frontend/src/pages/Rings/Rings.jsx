import CollectionPageLayout from '@layouts/CollectionPageLayout';
import { getPageContext } from '@services/collection.service';
import { TYPE_FILTERS } from '@constants/categories';
const PAGE_CONTEXT = getPageContext('rings');
export default function Rings() {
  return <CollectionPageLayout routeKey="rings" pageContext={PAGE_CONTEXT} filterOptions={TYPE_FILTERS.rings} pageRoute="/rings" />;
}

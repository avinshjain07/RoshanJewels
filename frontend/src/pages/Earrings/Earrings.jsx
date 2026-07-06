import CollectionPageLayout from '@layouts/CollectionPageLayout';
import { getPageContext } from '@services/collection.service';
import { TYPE_FILTERS } from '@constants/categories';
const PAGE_CONTEXT = getPageContext('earrings');
export default function Earrings() {
  return <CollectionPageLayout routeKey="earrings" pageContext={PAGE_CONTEXT} filterOptions={TYPE_FILTERS} pageRoute="/earrings" />;
}

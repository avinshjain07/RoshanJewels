import CollectionPageLayout from '@layouts/CollectionPageLayout';
import { getPageContext } from '@services/collection.service';
import { TYPE_FILTERS } from '@constants/categories';
const PAGE_CONTEXT = getPageContext('necklaces');
export default function Necklaces() {
  return <CollectionPageLayout routeKey="necklaces" pageContext={PAGE_CONTEXT} filterOptions={TYPE_FILTERS.necklaces} pageRoute="/necklaces" />;
}

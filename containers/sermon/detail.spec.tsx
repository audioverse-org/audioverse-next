import { getAllPostsWithSlug as getLatestSermons } from '../../lib/api'
import { getStaticPaths } from '../../pages/[language]/sermons/[id]'

jest.mock('../../lib/api')

describe("detailPageGenerator", () => {
    it("gets sermons", async () => {
        getLatestSermons.mockReturnValue({nodes: []})

        await getStaticPaths()

        expect(getLatestSermons).toBeCalled()
    })
})

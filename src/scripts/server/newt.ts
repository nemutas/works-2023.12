import { createClient } from 'newt-client-js'

export type WorksBody = {
  _id: string
  title: string
  kv: { src: string }
  url: string
  create: string
}

const client = createClient({
  spaceUid: import.meta.env.NEWT_SPACE_UID,
  token: import.meta.env.NEWT_CDN_API_TOKEN,
  apiType: 'cdn',
})

export async function fetchWorks() {
  const datas = await client.getContents<WorksBody>({
    appUid: 'works',
    modelUid: 'body',
    query: {
      select: ['_id', 'title', 'kv.src', 'url', 'create'],
    },
  })

  const works = datas.items.map((data) => {
    return {
      ...data,
      create: new Date(data.create).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }).split(' ')[0],
    }
  })

  const result: Object & { [year in string]: WorksBody[] } = {}

  for (const work of works) {
    const year = work.create.split('/')[0]
    if (!result.hasOwnProperty(year)) {
      result[year] = []
    }

    work.create = work.create
      .split('/')
      .map((s) => s.padStart(2, '0'))
      .join('.')
    result[year].push(work)
  }

  Object.values(result).forEach((works) => works.sort((a, b) => (new Date(a.create) < new Date(b.create) ? 1 : -1)))

  const years = Object.keys(result).sort((a, b) => (new Date(a) < new Date(b) ? 1 : -1))

  return { years, works: result }
}

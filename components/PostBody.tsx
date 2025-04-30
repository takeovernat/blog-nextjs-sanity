/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */
import { PortableText, type PortableTextReactComponents } from 'next-sanity'

import { SanityImage } from './SanityImage'

const myPortableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      return <SanityImage {...value} />
    },
    table: ({ value }) => {
      if (!value.rows) return null

      return (
        <table className="w-full border-collapse my-4">
          <tbody>
            {value.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.cells.map((cell, cellIndex) =>
                  // First row = headers (th), rest = normal cells (td)
                  rowIndex === 0 ? (
                    <th
                      key={cellIndex}
                      className="border p-2 font-bold bg-gray-100"
                    >
                      {cell}
                    </th>
                  ) : (
                    <td key={cellIndex} className="border p-2">
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )
    },
  },
}

export default function PostBody({ content }) {
  return (
    <div className="mx-auto max-w-2xl prose">
      <PortableText value={content} components={myPortableTextComponents} />
    </div>
  )
}

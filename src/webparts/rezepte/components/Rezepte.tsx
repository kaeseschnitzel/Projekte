import * as React from 'react';
import type { IRezepteProps } from './IRezepteProps';
import { SPFI } from '@pnp/sp';
import { getSP } from '../../../pnpjsConfig';
import { IREZEPTE } from '../../../interface';
import { Accordion, WebPartTitle } from '@pnp/spfx-controls-react';



const Rezepte = (props:IRezepteProps) => {
    const List_NAME = 'Rezepte';
    const _sp:SPFI = getSP(props.context);

const [rezepteItems, setRezepteIems] = React.useState<IREZEPTE[]>([])

    const getRezepteItems = async () => {

      const items =_sp.web.lists.getByTitle(List_NAME).items();

      console.log(items)

      setRezepteIems((await items).map((item:any) => {
        return {
          Id: item.Id,
          Title: item.Title,
          Zutaten: item.Zutaten,
          Zubereitung: item.Zubereitung,
          Zubereitungsdauer: item.Zubereitungsdauer
        }
      }))
    }

    React.useEffect(() => {
      getRezepteItems();
    },[])

    return (
      <>
        <WebPartTitle displayMode={props.displayMode}
            title={props.title}
            updateProperty={props.updateProperty} />
        {rezepteItems.map((o:IREZEPTE,index:number) => {
          return (<Accordion key={index} title={o.Title + ' ca: ' + o.Zubereitungsdauer + ' Minuten'} defaultCollapsed={true}>
            <p>
              <b>Zutaten:</b> <br/>
              {o.Zutaten}
            </p>
            <p>
              <b>Zubereitung:</b> <br/>
              {o.Zubereitung}
            </p>
          </Accordion>)
        })}
      </>
    )
  }

export default Rezepte
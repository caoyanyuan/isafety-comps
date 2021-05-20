import CAutocomplete from '@/base/search/cAutoComplete'
import CArrayListItem from '@/base/myForm/complexItems/cArrayListItem'
import CCascader from "@/base/myForm/items/cCascader"
import CCheckBox from "@/base/myForm/items/cCheckBox"
import CDate from "@/base/search/cDate"
import CInput from "@/base/myForm/items/cInput"
import CInputPopover from "@/base/myForm/complexItems/cInputPopover"
import CNumber from "@/base/myForm/items/cNumber"
import CRadio from "@/base/myForm/items/cRadio"
import CSelect from "@base/search/cSelect"
import CTime from "@base/search/cTime"
import CTree from "@/base/cover/cTree"
import CTransfer from "@/base/myForm/items/cTransfer"
import CUpload from "@/base/myForm/items/cUpload"

const TYPE_COMP = {
    radio: CRadio,
    upload: CUpload,
    autocomplete: CAutocomplete,
    date: CDate,
    time: CTime,
    number: CNumber,
    arrayList: CArrayListItem,
    checkbox: CCheckBox,
    select: CSelect,
    tree: CTree,
    inputpopover: CInputPopover,
    transfer: CTransfer,
    cascader: CCascader,
}

const SLOT_DEAL = {
    slot: { comp: 'div' }
}

let Vue = {
    props: {
        model: {},
        item: {},
        name: {},
        modelArray: {},
        headers: {},
        operDisabled: {}
    },
    render(h) {
        const deal = {
            ...TYPE_COMP,
            ...SLOT_DEAL,
        }
        let { type } = this.item,
            opts = {
                props: {
                    model: this.model,
                    item: this.item,
                    modelArray: this.model[this.item.name],
                    headers: this.item.arrayList,
                    operDisabled: this.item.operDisabled,
                    name: this.item.name
                },
                ref: type,
                on: {}
            }

            if (type === 'slot') {
                this._default = this.$slots.default
            }

        let express = deal[type] || CInput, 
            comp = express

            //如果有监听事件
        if(express.comp) {
            comp = express.comp
            opts.on = express.handler
            if (express.ref) {
                opts.ref = express.ref
            }
        }

        return h(comp, opts, this._default)
    }
}


export default Vue
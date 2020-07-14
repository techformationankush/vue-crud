<template>
	<div class="col-md-12 p-0">
		<div class="col-sm-12 popup_wrapper mt-3" style="background: white;">
			<div class="popup_header_top mb-4 d-flex">
				<a
					href="javascript:;"
					@click="$router.push('/')"
					class="w-20 d-inline-block rounded-circle clr1 float-left position-absolute"
				>
					<i class="fas fa-arrow-left fnt-20"></i
				></a>
				<div class="fnt-18 float-left text-back mx-auto">Edit Record</div>
			</div>
			<div class="clearfix"></div>
			<div class="wrapper_loader" v-if="!loading"> <div class="loader"></div> </div>
			<div class="pt-3 pb-4 mt-5 mb-3" v-else>
				<div class="row w-95 mx-auto mt-4">
					<div class="w-100 p-0" v-if="errors.length">
						<b>Please correct the following error(s):</b>
						<ul class="validations p-2">
							<li v-for="(error, index) in errors" :key="index">
								<div class="alert alert-danger">{{ error }}</div>
							</li>
						</ul>
					</div>

					<div class="col-md-12" @submit.prevent="submit" v-if="currentRecord">
						<div class="form-group text-left">
							<label for="formGroupExampleInput"><strong>Title</strong></label>
							<input
								type="text"
								required
								v-model="currentRecord.title"
								placeholder="title"
								name="title"
								class="form-control rounded-0 fnt-18"
							/>
						</div>
						<div class="form-group text-left">
							<label for="formGroupExampleInput"><strong>Description</strong></label>
							<input
								type="text"
								required
								v-model="currentRecord.desc"
								name="desc"
								placeholder="Description"
								class="form-control rounded-0 fnt-18"
							/>
						</div>
					</div>
				</div>
			</div>
			<div class="mt-5">
				<button
					@click="checkForm"
					type="button"
					class="btn btn-save w-80 fnt-16 mt-5"
				>
					Update
				</button>
			</div>
		</div>
		<Menu></Menu>
	</div>
</template>

<script>
import Menu from "./Menu";
import DataService from "./Services/DataService";
import swal from "sweetalert";

export default {
	name: "Edit",

	data() {
		return {
			currentRecord: null,
			errors: [],
            loading:false,
		};
		
	},
	components: {
		Menu
	},
	methods: {
		checkForm: function(e) {
			if (this.currentRecord.title && this.currentRecord.desc) {
				this.updateRecord();
			}
			console.log(this.currentRecord.title);
			console.log(this.currentRecord.desc);

			this.errors = [];

			if (!this.currentRecord.title) {
				this.errors.push("Title required.");
			}
			if (!this.currentRecord.desc) {
				this.errors.push("Description required.");
			}

			e.preventDefault();
		},
		editRecord(id) {
			DataService.edit(id)
				.then(response => {
					this.loading = true;
					this.currentRecord = JSON.parse(JSON.stringify(response.data));
				
				})
				.catch(e => {
					this.loading = false;
					console.log(e);
				});
		},
		updateRecord() {
			var data = {
				id: this.currentRecord.id,
				title: this.currentRecord.title,
				desc: this.currentRecord.desc
			};

			DataService.update(this.currentRecord.id, data)
				.then(response => {
					console.log(response);
					swal("Record", "Updated successfully!", "success").then(() => {
						this.$router.push({ name: "home", params: { submitted: true } });
					});
				})
				.catch(e => {
					console.log(e);
				});
		}
	},
	mounted() {
		this.editRecord(this.$route.params.id);
	}
};
</script>
